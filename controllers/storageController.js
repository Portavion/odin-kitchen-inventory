// controllers/storageController.js

exports.storageGet = (req, res) => {
  res.render("storage", { title: "This lists all the storages" });
};

exports.storageContentGet = (req, res) => {
  const storageName = req.params.id;
  res.render("storageContent", {
    title: storageName ? storageName : "Error",
    id: storageName,
  });
};

exports.newStorageFormGet = (req, res) => {
  res.render("newStorageForm", { title: "Add new storage:" });
};

exports.newStorageFormPost = (req, res) => {
  res.redirect("/");
};
