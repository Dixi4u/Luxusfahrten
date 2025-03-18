import express from "express";
import modelsRoutes from "./src/routes/models.js"
import brandRoutes from "./src/routes/brand.js"


const app = express();
app.use(express.json());


app.use("/api/models", modelsRoutes);
app.use("api/brand", brandRoutes);



export default app;