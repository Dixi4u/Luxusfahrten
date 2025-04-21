import express from "express";
import modelsRoutes from "./src/routes/models.js"
import brandRoutes from "./src/routes/brand.js"
import salesRoutes from "./src/routes/sales.js"
import providerRoutes from "./src/routes/provider.js"
import ordersRoutes from "./src/routes/orders.js"
import vehicleRoutes from "./src/routes/vehicles.js"
import restoredVehicleRoutes from "./src/routes/restoreVehicles.js"
import loginRoutes from "./src/routes/login.js"
import registerRoutes from "./src/routes/register.js"
import logoutRoute from "./src/routes/logout.js";

const app = express();
app.use(express.json());


app.use("/api/models", modelsRoutes);

app.use("api/brand", brandRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/provider", providerRoutes);

app.use("/api/orders", ordersRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/restoredvehicles", restoredVehicleRoutes);

app.use("api/register", registerRoutes)

app.use("/api/login", loginRoutes)

app.use("/api/logout", logoutRoute)



export default app;