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
  const itemQuantity = req.body.quantity;
  const queryPushNewItemText =
    "INSERT INTO item (item_name) VALUES ($1) RETURNING id";

  const result = await db.query(queryPushNewItemText, [itemName]);
  const newItemId = result.rows[0].id;
  const queryPushNewStorageItemText =
    "INSERT INTO storage_items (storage_id, item_id, quantity_total, quantity_left) VALUES ($1,$2,1,$3)";
  await db.query(queryPushNewStorageItemText, [
    storageId,
    newItemId,
    itemQuantity,
  ]);
  res.redirect("/storage/" + storageId);
}

async function deleteItemGet(req, res) {
  const itemId = req.params.itemId;
  const deleteFromItemQueryText = "DELETE FROM item WHERE id = ($1);";
  const deleteFromStorageItemQueryText =
    "DELETE FROM storage_items WHERE item_id = ($1) RETURNING storage_id;";

  const result = await db.query(deleteFromStorageItemQueryText, [itemId]);
  const redirectToStorageId = result.rows[0].storage_id;

  await db.query(deleteFromItemQueryText, [itemId]);
  res.redirect("/storage/" + redirectToStorageId);
}

async function updateQuantityPost(req, res) {
  const itemId = req.params.itemId;
  const newQuantity = req.body.newQuantity;
  console.log(newQuantity);
  const updateQuantityQueryText =
    "UPDATE storage_items SET quantity_left = $1 WHERE item_id = $2 RETURNING storage_id";

  const result = await db.query(updateQuantityQueryText, [newQuantity, itemId]);
  const redirectToStorageId = result.rows[0].storage_id;

  res.redirect("/storage/" + redirectToStorageId);
}

module.exports = {
  itemGet,
  addNewItemGet,
  addNewItemPost,
  deleteItemGet,
  updateQuantityPost,
};
