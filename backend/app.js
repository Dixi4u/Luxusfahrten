import express from "express";
import modelsRoutes from "./src/routes/models.js"


const app = express();
app.use(express.json());


app.use("/api/models", modelsRoutes);



export default app;