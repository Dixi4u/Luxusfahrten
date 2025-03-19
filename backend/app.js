import express from "express";
import modelsRoutes from "./src/routes/models.js";
import clientsRoutes from "./src/routes/clients.js";
import employeeRoutes from "./src/routes/employee.js";
import reviewRoutes from "./src/routes/reviews.js";


const app = express();
app.use(express.json());


app.use("/api/models", modelsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employee",employeeRoutes);
app.use("/api/reviews", reviewRoutes);




export default app;