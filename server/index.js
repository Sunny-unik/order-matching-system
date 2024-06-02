const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/index");
const orderRoutes = require("./routes/order");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
connectDB();

app.use("/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
