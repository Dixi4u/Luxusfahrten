const providerControllers = {};

import providerModels from "../models/Provider.js";

//Select

providerControllers.getProviders = async (req, res) => {
    const providers = await providerModels.find();
    res.json(providers);
};

//INSERT

providerControllers.insertProvider = async (req, res) => {
    const { nameProvider, addressProvider, phone, email, typeSupplier } = req.body;
    const newProvider = new providerModels({ nameProvider, addressProvider, phone, email, typeSupplier});
    await newProvider.save();
    res.json({ message: "Provider inserted" });
};

//UPDATE

providerControllers.updateProvider = async (req, res) => {
    const { nameProvider, addressProvider, phone, email, typeSupplier } = req.body;
    const updatedProvider = await providerModels.findByIdAndUpdate(req.params.id, { nameProvider, addressProvider, phone, email, typeSupplier }, { new: true });
    res.json({ message: "Provider updated" });
};

//DELETE

providerControllers.deleteProvider = async (req, res) => {
    await providerModels.findByIdAndDelete(req.params.id);
    res.json({ message: "Provider deleted" });
};

export default providerControllers;