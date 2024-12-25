// controllers/itemsController.js
const db = require("../db/pool.js");

function itemGet(req, res) {
  const itemId = req.params.itemId;
  res.render("itemDetails", { item: itemId, title: "Item details" });
}

function addNewItemGet(req, res) {
  const storageId = req.params.storageId;
  res.render("newItemForm", { title: "Add new item:", storageId: storageId });
}

async function addNewItemPost(req, res) {
  const storageId = req.params.storageId;
  const itemName = req.body.itemName;
  const queryPushNewItemText =
    "INSERT INTO item (item_name) VALUES ($1) RETURNING id";
  const result = await db.query(queryPushNewItemText, [itemName]);
  const newItemId = result.rows[0].id;
  console.log("storageId:" + storageId + " new item id: " + newItemId);
  const queryPushNewStorageItemText =
    "INSERT INTO storage_items (storage_id, item_id, quantity_total, quantity_left) VALUES ($1,$2,1,1)";
  await db.query(queryPushNewStorageItemText, [storageId, newItemId]);
  res.redirect("/storage/" + storageId);
}

module.exports = { itemGet, addNewItemGet, addNewItemPost };
