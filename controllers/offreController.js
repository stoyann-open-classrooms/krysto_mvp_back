const db = require("../models");

// Imports des models
const Offre = db.offres;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addOffre = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    prix: req.body.prix,
    description: req.body.description,
  };

  const offre = await Offre.create(data);
  res.status(200).send(offre);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllOffres = async (req, res) => {
  let offres = await Offre.findAll()
    .then((offres) =>
      res.json({
        message: `✅ ${offres.length} offres en base de données`,
        data: offres,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneOffre = async (req, res) => {
  let id = req.params.id;
  let offre = await Offre.findOne({ where: { id: id } });
  res.status(200).send(offre);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateOffre = async (req, res) => {
  let id = req.params.id;

  const offre = await Offre.update(req.body, { where: { id: id } });

  res.status(200).send(offre);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteOffre = async (req, res) => {
  let id = req.params.id;

  await Offre.destroy({ where: { id: id } });

  res.status(200).send("L'offre est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "offre_cover_";
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
  addOffre,
  getAllOffres,
  getOneOffre,
  updateOffre,
  deleteOffre,
  upload,
};
