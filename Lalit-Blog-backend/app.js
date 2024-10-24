const express = require("express");
const app = express();
const cors = require("cors");
const userRouterData = require("./Router/UserRouter");
const blogRoutes = require("./Router/BlogRouter")

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouterData);
app.use("/api/blog", blogRoutes)
module.exports = app;
