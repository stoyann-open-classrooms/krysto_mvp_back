const db = require("../models");

// Imports des models
const Partenaire = db.partenaires;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addPartenaire = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    prix: req.body.prix,
    description: req.body.description,
  };

  const partenaire = await Partenaire.create(data);
  res.status(200).send(partenaire);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllPartenaires = async (req, res) => {
  let partenaires = await Partenaire.findAll()
    .then((partenaires) =>
      res.json({
        message: `✅ ${partenaires.length} partenaires en base de données`,
        data: partenaires,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOnePartenaire = async (req, res) => {
  let id = req.params.id;
  let partenaire = await Partenaire.findOne({ where: { id: id } });
  res.status(200).send(partenaire);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updatePartenaire = async (req, res) => {
  let id = req.params.id;

  const partenaire = await Partenaire.update(req.body, { where: { id: id } });

  res.status(200).send(partenaire);
};

// =========================== Supprimer un troc via son ID ========================================
const deletePartenaire = async (req, res) => {
  let id = req.params.id;

  await Partenaire.destroy({ where: { id: id } });

  res.status(200).send("Le partenaire est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "partenaire_cover_";
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
  addPartenaire,
  getAllPartenaires,
  getOnePartenaire,
  updatePartenaire,
  deletePartenaire,
  upload,
};
