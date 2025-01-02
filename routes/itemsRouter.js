const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

/* GET home page. */
itemsRouter.get("/itemDetails/:itemId", itemsController.itemGet);
itemsRouter.get("/addNewItem/:storageId", itemsController.addNewItemGet);
itemsRouter.get("/deleteItem/:itemId", itemsController.deleteItemGet);
itemsRouter.post(
  "/updateQuantityPost/:itemId",
  itemsController.updateQuantityPost,
);

itemsRouter.post("/addNewItem/:storageId", itemsController.addNewItemPost);

module.exports = itemsRouter;
