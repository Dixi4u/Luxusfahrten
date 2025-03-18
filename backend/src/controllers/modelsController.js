const  modelsController = {};
import modelsModel from "../models/Models.js"

//SELECT
modelsController.getModel = async (req, res) => {
   const evaluation = await modelsModel.find().populate('idBranches')
   res.json(evaluation)
}

//INSERT
modelsController.insertModel = async (req, res) => {
    const { idBranch, nameModel } = req.body;
    const newModel = new modelsModel({ idBranch, nameModel })
    await newModel.save()
    res.json({message: "Model saved"})
}

//DELETE
modelsController.deleteModel = async (req, res) => {
    await modelsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted successfully"})
}

//UPDATE
modelsController.updateModel = async (req, res) => {
    const { idBranch, nameModel } = req.body;
    const updateModel = await modelsModel.findByIdAndUpdate(req.params.id,
        {idBranch, nameModel}, {new: true}
    )
    res.json({message: "Model updated successfully"})
}

export default modelsController;