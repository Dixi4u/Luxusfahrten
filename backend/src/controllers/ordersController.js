const ordersController = {};
import ordersModel from "../models/Orders.js"

//SELECT - CORREGIDO
ordersController.getOrder = async (req, res) => {
    try {
        console.log("📋 Obteniendo órdenes...");
        
        // Populate correcto según el esquema de Orders
        const orders = await ordersModel.find()
            .populate({
                path: 'idVehiculo', // Campo que existe en Orders
                populate: [
                    { path: 'idBrand', model: 'brand' }, // Populate anidado para la marca del vehículo
                    { path: 'idModel', model: 'model' }  // Populate anidado para el modelo del vehículo
                ]
            })
            .populate('idCliente'); // Campo que existe en Orders para el cliente
        
        console.log("✅ Órdenes obtenidas:", orders.length);
        res.json(orders);
        
    } catch (error) {
        console.error("❌ Error al obtener órdenes:", error);
        res.status(500).json({ 
            message: "Error al obtener órdenes", 
            error: error.message 
        });
    }
}

//INSERT - MEJORADO
ordersController.insertOrder = async (req, res) => {
    try {
        const { idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice } = req.body;
        
        console.log("📝 Datos recibidos para nueva orden:", req.body);
        
        // Validar campos requeridos
        if (!idVehiculo || !idCliente || !paymentMethod || !orderStatus || !orderDate || !totalPrice) {
            return res.status(400).json({ 
                message: "Todos los campos son obligatorios" 
            });
        }
        
        const newOrder = new ordersModel({ 
            idVehiculo, 
            idCliente, 
            paymentMethod, 
            orderStatus, 
            orderDate, 
            totalPrice 
        });
        
        await newOrder.save();
        
        console.log("✅ Nueva orden creada:", newOrder._id);
        res.status(201).json({
            message: "Orden creada exitosamente",
            order: newOrder
        });
        
    } catch (error) {
        console.error("❌ Error al crear orden:", error);
        res.status(500).json({ 
            message: "Error al crear la orden", 
            error: error.message 
        });
    }
}

//DELETE - MEJORADO
ordersController.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log("🗑️ Eliminando orden:", id);
        
        const deletedOrder = await ordersModel.findByIdAndDelete(id);
        
        if (!deletedOrder) {
            return res.status(404).json({ 
                message: "Orden no encontrada" 
            });
        }
        
        console.log("✅ Orden eliminada:", id);
        res.json({ 
            message: "Orden eliminada exitosamente",
            order: deletedOrder
        });
        
    } catch (error) {
        console.error("❌ Error al eliminar orden:", error);
        res.status(500).json({ 
            message: "Error al eliminar la orden", 
            error: error.message 
        });
    }
}

//UPDATE - MEJORADO
ordersController.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice } = req.body;
        
        console.log("🔄 Actualizando orden:", id, "con datos:", req.body);
        
        // Validar campos requeridos
        if (!idVehiculo || !idCliente || !paymentMethod || !orderStatus || !orderDate || !totalPrice) {
            return res.status(400).json({ 
                message: "Todos los campos son obligatorios" 
            });
        }
        
        const updateOrder = await ordersModel.findByIdAndUpdate(
            id,
            { idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice }, 
            { new: true, runValidators: true }
        );
        
        if (!updateOrder) {
            return res.status(404).json({ 
                message: "Orden no encontrada" 
            });
        }
        
        console.log("✅ Orden actualizada:", id);
        res.json({
            message: "Orden actualizada exitosamente",
            order: updateOrder
        });
        
    } catch (error) {
        console.error("❌ Error al actualizar orden:", error);
        res.status(500).json({ 
            message: "Error al actualizar la orden", 
            error: error.message 
        });
    }
}

export default ordersController;