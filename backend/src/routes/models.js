import express from "express";
import modelsController from "../controllers/modelsController.js";

const router = express.Router();

router.route("/")
.get(modelsController.getModel)
.post(modelsController.insertModel)

router.route("/:id")
.put(modelsController.updateModel)
.delete(modelsController.deleteModel)

export default router;