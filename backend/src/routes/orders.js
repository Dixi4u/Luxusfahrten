import express from "express";
import ordersController from "../controllers/ordersController.js";

const router = express.Router();

router.route("/")
.get(ordersController.getOrder)
.post(ordersController.insertOrder)

router.route("/:id")
.put(ordersController.updateOrder)
.delete(ordersController.deleteOrder)

export default router;