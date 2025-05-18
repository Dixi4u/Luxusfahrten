const providerControllers = {};

import providerModels from "../models/Provider.js";

//Select

providerControllers.getProviders = async (req, res) => {
    const providers = await providerModels.find();
    res.json(providers);
};

//INSERT

providerControllers.insertProvider = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier } = req.body;
    const newProvider = new providerModels({ name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier });
    await newProvider.save();
    res.json({ message: "Provider inserted" });
};

//UPDATE

providerControllers.updateProvider = async (req, res) => {
    const { name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier } = req.body;
    const updatedProvider = await providerModels.findByIdAndUpdate(req.params.id, { name, lastName, birthday, email, password, telephone, dui, isVerified, addressProvider, typeSupplier }, { new: true });
    res.json({ message: "Provider updated" });
};

//DELETE

providerControllers.deleteProvider = async (req, res) => {
    await providerModels.findByIdAndDelete(req.params.id);
    res.json({ message: "Provider deleted" });
};

export default providerControllers;