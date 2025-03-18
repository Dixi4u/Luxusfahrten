const brandControllers = {};

import brandModels from "../models/Brand.js";

brandControllers.getAllBrands = async (req, res) => {
    const brand = await brandModels.find();
    res.json(brand);
}

brandControllers.insertBrand = async (req, res) => {
    const {brandName} = req.body;
    const newBrand = new brandModels({brandName}); 
    await newBrand.save();
    res.json({message: "Brand inserted"});
}

brandControllers.updateBrand = async (req, res) => {
    const {brandName} = req.body;
    const updatedBrand = await brandModels.findByIdAndUpdate(req.params.id, {brandName}, {new: true});
    res.json({message: "Brand updated"});
}

brandControllers.deleteBrand = async (req, res) => {
    await brandModels.findByIdAndDelete(req.params.id);
    res.json({message: "Brand deleted"});
}                

export default brandControllers;