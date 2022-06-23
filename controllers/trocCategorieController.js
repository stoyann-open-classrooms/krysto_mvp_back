const db = require("../models");

// Imports des models
const TrocCategorie = db.trocCategories;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addTrocCategorie = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    description: req.body.description,
  };

  const trocCategorie = await TrocCategorie.create(data);
  res.status(200).send(trocCategorie);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllTrocCategories = async (req, res) => {
  let trocCategories = await TrocCategorie.findAll()
    .then((trocCategories) =>
      res.json({
        message: `✅ ${trocCategories.length} categories  en base de données`,
        data: trocCategories,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneTrocCategorie = async (req, res) => {
  let id = req.params.id;
  let trocCategorie = await TrocCategorie.findOne({
    where: { id: id },
  });
  res.status(200).send(trocCategorie);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateTrocCategorie = async (req, res) => {
  let id = req.params.id;

  const trocCategorie = await TrocCategorie.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(trocCategorie);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteTrocCategorie = async (req, res) => {
  let id = req.params.id;

  await TrocCategorie.destroy({ where: { id: id } });

  res.status(200).send("La categorie est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "categorie_troc_";
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
  addTrocCategorie,
  getAllTrocCategories,
  getOneTrocCategorie,
  updateTrocCategorie,
  deleteTrocCategorie,
  upload,
};
