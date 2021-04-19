const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");
const fashionersRoute = require("./routes/fashionersRoute");
const usersRoute = require("./routes/usersRoute");

dotenv.config();

const app = express();

//connection
connectDB();

//middleware
app.use(express.json());

app.use(morgan("dev"));

// routes
app.use("/api/v1/fashioners", fashionersRoute);
app.use("/api/v1/users", usersRoute);

//home route
app.get("/", (req, res) => {
  res.send("<h1>welcome to my Fashioners API</h1>");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started ${port}`));