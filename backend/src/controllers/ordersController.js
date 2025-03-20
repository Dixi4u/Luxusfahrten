const  ordersController = {};
import ordersModel from "../models/Orders.js"

//SELECT
ordersController.getOrder = async (req, res) => {
   const evaluation = await ordersModel.find().populate('idBrand')
   res.json(evaluation)
}

//INSERT
ordersController.insertOrder = async (req, res) => {
    const { idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice } = req.body;
    const newOrder = new ordersModel({ idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice })
    await newOrder.save()
    res.json({message: "Saved successfully"})
}

//DELETE
ordersController.deleteOrder = async (req, res) => {
    await ordersModel.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted successfully"})
}

//UPDATE
ordersController.updateOrder = async (req, res) => {
    const { idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice } = req.body;
    const updateOrder = await ordersModel.findByIdAndUpdate(req.params.id,
        {idVehiculo, idCliente, paymentMethod, orderStatus, orderDate, totalPrice}, {new: true}
    )
    res.json({message: "Updated successfully"})
}

export default ordersController;