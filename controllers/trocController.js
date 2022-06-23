const db = require("../models");

// Imports des models
const Troc = db.trocs;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addTroc = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    titre: req.body.titre,
    prix: req.body.prix,
    description: req.body.description,
    profilId: req.body.profilId,
    trocCategorieId: req.body.trocCategorieId,
  };

  const troc = await Troc.create(data);
  res.status(200).send(troc);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllTrocs = async (req, res) => {
  let trocs = await Troc.findAll()
    .then((trocs) =>
      res.json({
        message: `✅ ${trocs.length} trocs en base de données`,
        data: trocs,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneTroc = async (req, res) => {
  let id = req.params.id;
  let troc = await Troc.findOne({ where: { id: id } });
  res.status(200).send(troc);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateTroc = async (req, res) => {
  let id = req.params.id;

  const troc = await Troc.update(req.body, { where: { id: id } });

  res.status(200).send(troc);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteTroc = async (req, res) => {
  let id = req.params.id;

  await Troc.destroy({ where: { id: id } });

  res.status(200).send("Le troc est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "troc_cover_";
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
  addTroc,
  getAllTrocs,
  getOneTroc,
  updateTroc,
  deleteTroc,
  upload,
};
