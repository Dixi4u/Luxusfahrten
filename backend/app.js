import express from "express"
import cookieParser from 'cookie-parser'
import modelsRoutes from "./src/routes/models.js"
import brandRoutes from "./src/routes/brand.js"
import salesRoutes from "./src/routes/sales.js"
import providerRoutes from "./src/routes/provider.js"
import ordersRoutes from "./src/routes/orders.js"
import vehicleRoutes from "./src/routes/vehicles.js"
import restoredVehicleRoutes from "./src/routes/restoreVehicles.js"
import loginRoutes from "./src/routes/login.js"
import registerModeratorRoutes from "./src/routes/register.js"
import logoutRoute from "./src/routes/logout.js"
import registerUserRoutes from "./src/routes/registerUser.js"
import passRecovRoutes from "./src/routes/passRecov.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use("/api/models", modelsRoutes)

app.use("api/brand", brandRoutes)

app.use("/api/sales", salesRoutes)

app.use("/api/provider", providerRoutes)

app.use("/api/orders", ordersRoutes)

app.use("/api/vehicles", vehicleRoutes)

app.use("/api/restoredvehicles", restoredVehicleRoutes)

app.use("/api/register/moderator", registerModeratorRoutes)

app.use("/api/register/Users", registerUserRoutes)

app.use("/api/login", loginRoutes)

app.use("/api/logout", logoutRoute)

app.use("/api/passRecov", passRecovRoutes)



export default app;