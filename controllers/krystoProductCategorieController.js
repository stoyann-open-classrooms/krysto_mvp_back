const db = require("../models");

// Imports des models
const KrystoProductCategorie = db.krystoProductCategories;

// image Upload
const multer = require("multer");
const path = require("path");
const { krystoProducts } = require("../models");

// =========================== Poster un trocs ========================================

const addKrystoProductCategorie = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    description: req.body.description,
  };

  const krystoProductCategorie = await KrystoProductCategorie.create(data);
  res.status(200).send(krystoProductCategorie);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllKrystoProductCategories = async (req, res) => {
  let krystoProductCategories = await KrystoProductCategorie.findAll()
    .then((krystoProductCategories) =>
      res.json({
        message: `✅ ${krystoProductCategories.length} categories  en base de données`,
        data: krystoProductCategories,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneKrystoProductCategorie = async (req, res) => {
  let id = req.params.id;
  let krystoProductCategorie = await KrystoProductCategorie.findOne({
    where: { id: id },
  });
  res.status(200).send(krystoProductCategorie);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateKrystoProductCategorie = async (req, res) => {
  let id = req.params.id;

  const krystoProductCategorie = await KrystoProductCategorie.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(krystoProductCategorie);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteKrystoProductCategorie = async (req, res) => {
  let id = req.params.id;

  await KrystoProductCategorie.destroy({ where: { id: id } });

  res.status(200).send("La categorie est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "categorie_produit_krysto_";
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
  addKrystoProductCategorie,
  getAllKrystoProductCategories,
  getOneKrystoProductCategorie,
  updateKrystoProductCategorie,
  deleteKrystoProductCategorie,
  upload,
};
