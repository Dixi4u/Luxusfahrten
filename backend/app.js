import express from "express";
import modelsRoutes from "./src/routes/models.js"
import brandRoutes from "./src/routes/brand.js"
import salesRoutes from "./src/routes/sales.js"
import providerRoutes from "./src/routes/provider.js"


const app = express();
app.use(express.json());


app.use("/api/models", modelsRoutes);
app.use("api/brand", brandRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/provider", providerRoutes);



export default app;