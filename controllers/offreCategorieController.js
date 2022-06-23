const db = require("../models");

// Imports des models
const OffreCategorie = db.offreCategories;

// image Upload
const multer = require("multer");
const path = require("path");
const { krystoProducts } = require("../models");

// =========================== Poster un trocs ========================================

const addOffreCategorie = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    description: req.body.description,
  };

  const offreCategorie = await OffreCategorie.create(data);
  res.status(200).send(offreCategorie);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllOffreCategories = async (req, res) => {
  let offreCategories = await OffreCategorie.findAll()
    .then((offreCategories) =>
      res.json({
        message: `✅ ${offreCategories.length} categories  en base de données`,
        data: offreCategories,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneOffreCategorie = async (req, res) => {
  let id = req.params.id;
  let offreCategorie = await OffreCategorie.findOne({
    where: { id: id },
  });
  res.status(200).send(offreCategorie);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateOffreCategorie = async (req, res) => {
  let id = req.params.id;

  const offreCategorie = await OffreCategorie.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(offreCategorie);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteOffreCategorie = async (req, res) => {
  let id = req.params.id;

  await OffreCategorie.destroy({ where: { id: id } });

  res.status(200).send("La categorie est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "categorie_offre_";
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
  addOffreCategorie,
  getAllOffreCategories,
  updateOffreCategorie,
  getOneOffreCategorie,
  deleteOffreCategorie,
  upload,
};
