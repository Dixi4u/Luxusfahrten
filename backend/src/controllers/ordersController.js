const ordersController = {};
import ordersModel from "../models/Orders.js";

// SELECT - Obtener todas las órdenes
ordersController.getOrders = async (req, res) => {
  try {
    console.log("🔍 Obteniendo pedidos desde la base de datos...");
    
    // Populate las referencias a vehículos y clientes
    const orders = await ordersModel.find()
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
      })
      .sort({ createdAt: -1 });

    console.log(`✅ Se encontraron ${orders.length} pedidos`);
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error al obtener órdenes:", error);
    res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
  }
};

// INSERT - Crear nueva orden (mantiene funcionalidad original + nueva)
ordersController.insertOrder = async (req, res) => {
  try {
    console.log("📝 Datos recibidos:", req.body);
    
    const {
      // Campos originales
      fullName,
      documentId,
      phone,
      email,
      address,
      paymentMethod,
      insuranceSelected,
      termsAccepted,
      // Campos nuevos para gestión de pedidos
      idVehiculo,
      idCliente,
      orderStatus,
      orderDate,
      totalPrice
    } = req.body;

    // Si vienen los campos nuevos (gestión de pedidos)
    if (idVehiculo && idCliente) {
      // Validación para pedidos de gestión
      if (!idVehiculo || !idCliente || !paymentMethod || !orderStatus || !orderDate || !totalPrice) {
        return res.status(400).json({ 
          message: "Campos obligatorios para pedido: idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice"
        });
      }

      const newOrder = new ordersModel({
        idVehiculo,
        idCliente,
        paymentMethod,
        orderStatus,
        orderDate,
        totalPrice: parseFloat(totalPrice),
        // Campos por defecto para mantener esquema
        fullName: "Gestionado",
        documentId: "00000000-0",
        phone: "0000-0000",
        email: "gestion@luxusfahrten.com",
        address: "Gestión interna",
        termsAccepted: true
      });

      await newOrder.save();
      console.log("✅ Pedido de gestión creado exitosamente");
      return res.status(201).json({ message: "Pedido creado exitosamente", order: newOrder });
    } 
    
    // Si vienen los campos originales (formulario web)
    else {
      // Validación original
      if (
        !fullName || !documentId || !phone ||
        !email || !address || !paymentMethod ||
        termsAccepted !== true
      ) {
        return res.status(400).json({ message: "Campos obligatorios incompletos o términos no aceptados." });
      }

      const newOrder = new ordersModel({
        fullName,
        documentId,
        phone,
        email,
        address,
        paymentMethod,
        insuranceSelected: insuranceSelected || false,
        termsAccepted
      });

      await newOrder.save();
      console.log("✅ Orden web creada exitosamente");
      return res.status(201).json({ message: "Orden guardada exitosamente." });
    }
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    res.status(500).json({ message: "Error al guardar la orden", error: error.message });
  }
};

// DELETE - Eliminar orden por ID
ordersController.deleteOrder = async (req, res) => {
  try {
    console.log("🗑️ Eliminando pedido con ID:", req.params.id);
    
    const deleted = await ordersModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }
    
    console.log("✅ Pedido eliminado correctamente");
    res.status(200).json({ message: "Orden eliminada correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar:", error);
    res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
  }
};

// UPDATE - Actualizar orden por ID (mantiene funcionalidad original + nueva)
ordersController.updateOrder = async (req, res) => {
  try {
    console.log("🔄 Actualizando pedido con ID:", req.params.id);
    console.log("Datos a actualizar:", req.body);
    
    const {
      // Campos originales
      fullName,
      documentId,
      phone,
      email,
      address,
      paymentMethod,
      insuranceSelected,
      termsAccepted,
      // Campos nuevos
      idVehiculo,
      idCliente,
      orderStatus,
      orderDate,
      totalPrice
    } = req.body;

    // Preparar datos de actualización
    const updateData = {};

    // Si vienen campos de gestión
    if (idVehiculo) updateData.idVehiculo = idVehiculo;
    if (idCliente) updateData.idCliente = idCliente;
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (orderDate) updateData.orderDate = orderDate;
    if (totalPrice) updateData.totalPrice = parseFloat(totalPrice);

    // Si vienen campos originales
    if (fullName) updateData.fullName = fullName;
    if (documentId) updateData.documentId = documentId;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (address) updateData.address = address;
    if (paymentMethod) updateData.paymentMethod = paymentMethod;
    if (insuranceSelected !== undefined) updateData.insuranceSelected = insuranceSelected;
    if (termsAccepted !== undefined) updateData.termsAccepted = termsAccepted;

    const updated = await ordersModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    console.log("✅ Pedido actualizado correctamente");
    res.status(200).json({ message: "Orden actualizada correctamente.", updated });
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
  }
};

export default ordersController;