const saleControllers = {};

import salesModel from '../models/Sales.js';

// SELECT - Obtener todas las ventas
saleControllers.getSales = async (req, res) => {
    try {
        const sales = await salesModel.find();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sales' });
    }
};

// INSERT - Crear una nueva venta
saleControllers.insertSale = async (req, res) => {
    try {
        const {
            name,
            document,
            phone,
            email,
            address,
            paymentMethod,
            insurance,
            totalAmount,
            estimatedDeliveryDate
        } = req.body;

        const newSale = new salesModel({
            name,
            document,
            phone,
            email,
            address,
            paymentMethod,
            insurance,
            totalAmount,
            estimatedDeliveryDate
        });

        await newSale.save();
        res.json({ message: 'Sale saved successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error saving sale', details: error.message });
    }
};

// UPDATE - Actualizar una venta existente
saleControllers.updateSale = async (req, res) => {
    try {
        const {
            name,
            document,
            phone,
            email,
            address,
            paymentMethod,
            insurance,
            totalAmount,
            estimatedDeliveryDate
        } = req.body;

        const updatedSale = await salesModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                document,
                phone,
                email,
                address,
                paymentMethod,
                insurance,
                totalAmount,
                estimatedDeliveryDate
            },
            { new: true }
        );

        res.json({ message: 'Sale updated successfully', updatedSale });
    } catch (error) {
        res.status(400).json({ error: 'Error updating sale', details: error.message });
    }
};

// DELETE - Eliminar una venta
saleControllers.deleteSale = async (req, res) => {
    try {
        await salesModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting sale', details: error.message });
    }
};

export default saleControllers;
