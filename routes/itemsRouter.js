const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

/* GET home page. */
itemsRouter.get("/itemDetails/:itemId", itemsController.itemGet);
itemsRouter.get("/addNewItem", itemsController.addNewItemGet);

itemsRouter.post("/addNewItem", itemsController.addNewItemPost);

module.exports = itemsRouter;
