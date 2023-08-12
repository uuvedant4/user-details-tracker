const express = require("express");
const detailsRouter = require("./routes/userDetails");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", detailsRouter);

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}/`)
);
