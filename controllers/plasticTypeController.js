const db = require("../models");

// Imports des models
const PlasticType = db.plasticTypes;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addPlasticType = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    plasticType: req.body.plasticType,
    description: req.body.description,
  };

  const plasticType = await PlasticType.create(data);
  res.status(200).send(plasticType);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllPlasticTypes = async (req, res) => {
  let plasticTypes = await PlasticType.findAll()
    .then((plasticTypes) =>
      res.json({
        message: `✅ ${plasticTypes.length} types de plastique en base de données`,
        data: plasticTypes,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOnePlasticType = async (req, res) => {
  let id = req.params.id;
  let plasticType = await PlasticType.findOne({ where: { id: id } });
  res.status(200).send(plasticType);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updatePlasticType = async (req, res) => {
  let id = req.params.id;

  const plasticType = await PlasticType.update(req.body, { where: { id: id } });

  res.status(200).send(plasticType);
};

// =========================== Supprimer un troc via son ID ========================================
const deletePlasticType = async (req, res) => {
  let id = req.params.id;

  await PlasticType.destroy({ where: { id: id } });

  res.status(200).send("Le type de plastique est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "plastic_logo_";
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
  addPlasticType,
  getAllPlasticTypes,
  getOnePlasticType,
  updatePlasticType,
  //   updateFournisseur,
  deletePlasticType,
  upload,
};
