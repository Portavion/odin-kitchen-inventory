// controllers/itemsController.js

exports.itemGet = (req, res) => {
  const itemId = req.params.itemId;
  res.render("itemDetails", { item: itemId, title: "Item details" });
};

exports.addNewItemGet = (req, res) => {
  res.render("newItemForm", { title: "Add new item:" });
};

exports.addNewItemPost = (req, res) => {
  res.redirect("/");
};
