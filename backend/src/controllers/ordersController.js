const ordersController = {};
import ordersModel from "../models/Orders.js";

// SELECT - Obtener todas las órdenes
ordersController.getOrders = async (req, res) => {
  try {
    console.log("🔍 Obteniendo pedidos desde la base de datos...");
    
    const orders = await ordersModel.find()
      .populate({
        path: 'idVehiculo',
        populate: [
          { path: 'idBrand', select: 'name' },
          { path: 'idModel', select: 'name' }
        ],
        select: 'idBrand idModel year color price'
      })
      .populate({
        path: 'idCliente',
        select: 'name lastName email telephone'
      })
      .sort({ createdAt: -1 });

    console.log(`✅ Se encontraron ${orders.length} pedidos`);
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error al obtener órdenes:", error);
    res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
  }
};

// INSERT - Crear nueva orden
ordersController.insertOrder = async (req, res) => {
  try {
    console.log("📝 Datos recibidos para crear pedido:", req.body);
    
    const {
      idCliente,
      idVehiculo,
      metodoPago,
      terminosYSeguro,
      precioTotal,
      status
    } = req.body;

    // Validación de campos obligatorios
    if (!idCliente || !idVehiculo || !metodoPago || !precioTotal) {
      return res.status(400).json({ 
        message: "Campos obligatorios: idCliente, idVehiculo, metodoPago, precioTotal"
      });
    }

    // Validar que términos y seguro esté aceptado
    if (terminosYSeguro !== true) {
      return res.status(400).json({ 
        message: "Debe aceptar los términos y condiciones" 
      });
    }

    // Validar que el precio sea un número positivo
    const numericPrice = parseFloat(precioTotal);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ 
        message: "El precio total debe ser un número válido mayor a 0" 
      });
    }

    const newOrder = new ordersModel({
      idCliente,
      idVehiculo,
      metodoPago,
      terminosYSeguro,
      precioTotal: numericPrice,
      status: status || 'Pendiente'
    });

    await newOrder.save();
    console.log("✅ Pedido creado exitosamente");
    
    // Retornar el pedido con populate para mostrar datos completos
    const createdOrder = await ordersModel.findById(newOrder._id)
      .populate({
        path: 'idVehiculo',
        populate: [
          { path: 'idBrand', select: 'name' },
          { path: 'idModel', select: 'name' }
        ]
      })
      .populate({
        path: 'idCliente',
        select: 'name lastName email telephone'
      });

    res.status(201).json({ 
      message: "Pedido creado exitosamente", 
      order: createdOrder 
    });
  } catch (error) {
    console.error("❌ Error al crear pedido:", error);
    res.status(500).json({ message: "Error al crear el pedido", error: error.message });
  }
};

// DELETE - Eliminar orden por ID
ordersController.deleteOrder = async (req, res) => {
  try {
    console.log("🗑️ Eliminando pedido con ID:", req.params.id);
    
    const deleted = await ordersModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }
    
    console.log("✅ Pedido eliminado correctamente");
    res.status(200).json({ message: "Pedido eliminado correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar:", error);
    res.status(500).json({ message: "Error al eliminar el pedido", error: error.message });
  }
};

// UPDATE - Actualizar orden por ID
ordersController.updateOrder = async (req, res) => {
  try {
    console.log("🔄 Actualizando pedido con ID:", req.params.id);
    console.log("Datos a actualizar:", req.body);
    
    const {
      idCliente,
      idVehiculo,
      metodoPago,
      terminosYSeguro,
      precioTotal,
      status
    } = req.body;

    // Preparar datos de actualización
    const updateData = {};
    
    if (idCliente) updateData.idCliente = idCliente;
    if (idVehiculo) updateData.idVehiculo = idVehiculo;
    if (metodoPago) updateData.metodoPago = metodoPago;
    if (terminosYSeguro !== undefined) updateData.terminosYSeguro = terminosYSeguro;
    if (precioTotal) updateData.precioTotal = parseFloat(precioTotal);
    if (status) updateData.status = status;

    const updated = await ordersModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    .populate({
      path: 'idVehiculo',
      populate: [
        { path: 'idBrand', select: 'name' },
        { path: 'idModel', select: 'name' }
      ]
    })
    .populate({
      path: 'idCliente',
      select: 'name lastName email telephone'
    });

    if (!updated) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    console.log("✅ Pedido actualizado correctamente");
    res.status(200).json({ 
      message: "Pedido actualizado correctamente.", 
      order: updated 
    });
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    res.status(500).json({ message: "Error al actualizar el pedido", error: error.message });
  }
};

export default ordersController;