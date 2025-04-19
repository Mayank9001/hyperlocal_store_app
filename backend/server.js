const express = require("express");
const dotenv = require("dotenv");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mongoose = require("mongoose");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(require("cors")());
app.get("/", (req, res) => {
  res.status(200).send({ status: "success", msg: "API is working well." });
});
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error(error);
    });
});
