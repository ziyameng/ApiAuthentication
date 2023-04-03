const express = require("express");
const connectDB = require("./config/database");
connectDB();
const app = express();
require("dotenv").config();

app.use(express.json());
//Import Middleware
app.use("/api/auth", require("./Auth/Route"));

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`server is successfully running at ${PORT} `)
);

process.on("unhandledRejection", (err) => {
  console.log(`error occured: ${err.message}`);
  server.close(() => process.exit(1));
});
