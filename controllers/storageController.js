// controllers/storageController.js
const db = require("../db/pool.js");

async function storageGet(req, res) {
  const queryText = "SELECT * FROM storage";
  const storageArray = await db.query(queryText);
  res.render("storage", {
    title: "This lists all the storages",
    storageArray: storageArray.rows,
  });
}

async function storageContentGet(req, res) {
  const filterByStorageId = req.params.filterByStorageId;
  const queryText =
    "SELECT * FROM storage_items JOIN item ON storage_items.item_id = item.id JOIN storage ON storage_items.storage_id = storage.id WHERE storage_id = ($1)";
  const itemsInStorage = await db.query(queryText, [filterByStorageId]);
  // const storageName = req.params.id;
  res.render("storageContent", {
    title: filterByStorageId ? "Storage Content" : "Error",
    id: filterByStorageId,
    itemsInStorage: itemsInStorage.rows,
  });
}

function newStorageFormGet(req, res) {
  res.render("newStorageForm", { title: "Add new storage:" });
}

async function newStorageFormPost(req, res) {
  const queryText = "INSERT INTO storage (storage_name) VALUES ($1)";
  const newStorageName = req.body.storageName;
  await db.query(queryText, [newStorageName]);
  res.redirect("/");
}

module.exports = {
  storageGet,
  storageContentGet,
  newStorageFormGet,
  newStorageFormPost,
};
