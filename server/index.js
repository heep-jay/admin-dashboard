import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import hemlet from "helmet";
import morgan from "morgan";

/* route imports */
import clientRoutes from "./routes/client.js"
import salesRoutes from "./routes/sales.js"
import managementRoutes from "./routes/management.js"
import generalRoutes from "./routes/general.js"


/* Data Imports */
import User from "./models/User.js"
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js"
import { dataUser, dataProductStat, dataProduct, dataTransaction, dataOverallStat } from "./data/index.js"



/* Configurations */
dotenv.config()
const app = express();
app.use(express.json())
app.use(hemlet());
app.use(hemlet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* Mongoose Setup */
const PORT = process.env.PORT || 9000
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Server Connected")
    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // OverallStat.insertMany(dataOverallStat);
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)

}).catch((error) => {
    console.error(`${error} did not connect`)
})