const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./router/auth");
const folderRoute = require("./router/folder");
const noteRoute = require("./router/note");
dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/v1/auth/", userRoute);
app.use("/v1/folder/", folderRoute);
app.use("/v1/note/", noteRoute);
const port = process.env.PORT;
mongoose.connect(process.env.MONGOOSE_URL, () => {
  console.log("MongoDB is connected");
});
app.listen(port, () => {
  console.log(`Server is runing ${port}`);
});
