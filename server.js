import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
dotenv.config();
//database
connectDB();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Welcome TrendyMart");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
