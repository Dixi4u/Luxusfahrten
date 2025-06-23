const ordersController = {};
import ordersModel from "../models/Orders.js";

// SELECT - Obtener todas las órdenes
ordersController.getOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error });
  }
};

// INSERT - Crear nueva orden
ordersController.insertOrder = async (req, res) => {
  try {
    const {
      fullName,
      documentId,
      phone,
      email,
      address,
      paymentMethod,
      insuranceSelected,
      termsAccepted
    } = req.body;

    // Validación básica
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
    res.status(201).json({ message: "Orden guardada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la orden", error });
  }
};

// DELETE - Eliminar orden por ID
ordersController.deleteOrder = async (req, res) => {
  try {
    const deleted = await ordersModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }
    res.status(200).json({ message: "Orden eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error });
  }
};

// UPDATE - Actualizar orden por ID
ordersController.updateOrder = async (req, res) => {
  try {
    const {
      fullName,
      documentId,
      phone,
      email,
      address,
      paymentMethod,
      insuranceSelected,
      termsAccepted
    } = req.body;

    const updated = await ordersModel.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        documentId,
        phone,
        email,
        address,
        paymentMethod,
        insuranceSelected,
        termsAccepted
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    res.status(200).json({ message: "Orden actualizada correctamente.", updated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error });
  }
};

export default ordersController;
