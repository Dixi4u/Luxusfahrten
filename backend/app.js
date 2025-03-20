import express from "express";
import modelsRoutes from "./src/routes/models.js"
import brandRoutes from "./src/routes/brand.js"
import salesRoutes from "./src/routes/sales.js"
import providerRoutes from "./src/routes/provider.js"
import ordersRoutes from "./src/routes/orders.js"
import vehicleRoutes from "./src/routes/vehicles.js"
import restoredVehicleRoutes from "./src/routes/restoreVehicles.js"

const app = express();
app.use(express.json());


app.use("/api/models", modelsRoutes);

app.use("api/brand", brandRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/provider", providerRoutes);

app.use("/api/orders", ordersRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/restoredvehicles", restoredVehicleRoutes);




export default app;