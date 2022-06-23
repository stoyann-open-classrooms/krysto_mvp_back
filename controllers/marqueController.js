const db = require("../models");

// Imports des models
const Marque = db.marques;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addMarque = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    marque: req.body.marque,
  };

  const marque = await Marque.create(data);
  res.status(200).send(marque);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllMarques = async (req, res) => {
  let marques = await Marque.findAll()
    .then((marques) =>
      res.json({
        message: `✅ ${marques.length} marques en base de données`,
        data: marques,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateMarque = async (req, res) => {
  let id = req.params.id;

  const marque = await Marque.update(req.body, { where: { id: id } });

  res.status(200).send(marque);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteMarque = async (req, res) => {
  let id = req.params.id;

  await Marque.destroy({ where: { id: id } });

  res.status(200).send("La marque est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "marque_logo_";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, im + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

// =========================== EXPORT ========================================

module.exports = {
  addMarque,
  getAllMarques,

  updateMarque,

  deleteMarque,
  upload,
};
