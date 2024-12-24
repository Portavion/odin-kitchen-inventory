var createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

const storageRouter = require("./routes/storageRouter");
const itemsRouter = require("./routes/itemsRouter");
const { warn } = require("console");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", storageRouter);
app.use("/items", itemsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Message board running on http://localhost:3000`);
});

module.exports = app;
