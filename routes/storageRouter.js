const { Router } = require("express");
const storageController = require("../controllers/storageController");
const storageRouter = Router();

/* GET home page. */
storageRouter.get("/", storageController.storageGet);

storageRouter.get("/storage", storageController.storageContentGet);
storageRouter.get(
  "/storage/:filterByStorageId",
  storageController.storageContentGet,
);

storageRouter.get("/newStorage", storageController.newStorageFormGet);
storageRouter.post("/newStorage", storageController.newStorageFormPost);

module.exports = storageRouter;
