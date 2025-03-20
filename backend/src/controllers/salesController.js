const saleControllers = {};

import salesModel from '../models/Sales.js';

// SELECT

saleControllers.getSales = async (req, res) => {
    const sales = await salesModel.find();
    res.json(sales);
}

// INSERT

saleControllers.insertSale = async (req, res) => {
    const { idBranch, idClient, idVehicle, saleDate, salePrice,saleStatus, finalSalePrice } = req.body;
    const newSale = new salesModel({ idBranch, idClient, idVehicle, saleDate, salePrice,saleStatus, finalSalePrice});
    await newSale.save();
    res.json({ message: 'Sale saved' });
}

// UPDATE

saleControllers.updateSale = async (req, res) => {
    const { saleDate, salePrice, saleStatus, finalSalePrice } = req.body;
    const updatedSale = await salesModel.findByIdAndUpdate(req.params.id, { saleDate, salePrice, saleStatus, finalSalePrice }, { new: true });
    res.json({ message: 'Sale updated' });
}

// DELETE

saleControllers.deleteSale = async (req, res) => {
    await salesModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sale deleted' });
}

export default saleControllers;