// controllers/storageController.js
const db = require("../db/pool.js");

async function storageGet(req, res) {
  const text = "SELECT * FROM storage";
  const storageArray = await db.query(text);
  console.log("db returns: " + storageArray.rows[0].storage_name);
  res.render("storage", {
    title: "This lists all the storages",
    storageArray: storageArray.rows,
  });
}

function storageContentGet(req, res) {
  const storageName = req.params.id;
  res.render("storageContent", {
    title: storageName ? storageName : "Error",
    id: storageName,
  });
}

function newStorageFormGet(req, res) {
  res.render("newStorageForm", { title: "Add new storage:" });
}

function newStorageFormPost(req, res) {
  res.redirect("/");
}

module.exports = {
  storageGet,
  storageContentGet,
  newStorageFormGet,
  newStorageFormPost,
};
