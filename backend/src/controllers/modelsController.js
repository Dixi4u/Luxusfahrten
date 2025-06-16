const modelsController = {};
import modelsModel from "../models/Models.js"

//SELECT
modelsController.getModel = async (req, res) => {
   try {
       const evaluation = await modelsModel.find().populate('idBrand', 'brandName')
       res.json(evaluation)
   } catch (error) {
       res.status(500).json({ message: error.message })
   }
}

//INSERT
modelsController.insertModel = async (req, res) => {
    try {
        // Cambiar idBranch por idBrand para coincidir con el frontend
        const { idBrand, nameModel } = req.body;
        
        console.log("Datos recibidos:", { idBrand, nameModel });
        
        const newModel = new modelsModel({ idBrand, nameModel })
        const savedModel = await newModel.save()
        
        // Populate el modelo recién creado antes de responder
        const populatedModel = await modelsModel.findById(savedModel._id).populate('idBrand', 'brandName')
        
        res.status(201).json({
            message: "Model saved",
            model: populatedModel
        })
    } catch (error) {
        console.error("Error saving model:", error);
        res.status(500).json({ message: error.message })
    }
}

//DELETE
modelsController.deleteModel = async (req, res) => {
    try {
        await modelsModel.findByIdAndDelete(req.params.id)
        res.json({message: "Deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//UPDATE
modelsController.updateModel = async (req, res) => {
    try {
        // Cambiar idBranch por idBrand para coincidir con el frontend
        const { idBrand, nameModel } = req.body;
        
        const updateModel = await modelsModel.findByIdAndUpdate(
            req.params.id,
            { idBrand, nameModel }, 
            { new: true }
        ).populate('idBrand', 'brandName')
        
        res.json({
            message: "Model updated successfully",
            model: updateModel
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default modelsController;