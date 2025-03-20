import express from "express";
import modelsRoutes from "./src/routes/models.js"
import brandRoutes from "./src/routes/brand.js"
import ordersRoutes from "./src/routes/orders.js"
import restoredVehicleRoutes from "./src/routes/restoreVehicles.js"

const app = express();
app.use(express.json());


app.use("/api/model", modelsRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/restored", restoredVehicleRoutes);
//a

export default app;