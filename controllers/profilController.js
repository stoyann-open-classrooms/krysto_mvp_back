const db = require("../models");

// Imports des models
const Profil = db.profils;
const User = db.users;
const Troc = db.trocs;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addProfil = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    prenom: req.body.prenom,
    phone: req.body.phone,
    pseudo: req.body.pseudo,
    description: req.body.description,
    adresse: req.body.adresse,
    userId: req.body.userId,
    villeId: req.body.villeId,
  };

  const profil = await Profil.create(data);
  res.status(200).send(profil);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllProfils = async (req, res) => {
  let profils = await Profil.findAll({
    include: { model: User, attributes: ["id", "email"], as: "user" },
  })
    .then((profils) =>
      res.json({
        message: `✅ ${profils.length} profil en base de données`,
        data: profils,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneProfil = async (req, res) => {
  let id = req.params.id;
  let profil = await Profil.findOne({
    include: { model: Troc, as: "trocs" },

    where: { id: id },
  });
  res.status(200).send(profil);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateProfil = async (req, res) => {
  let id = req.params.id;

  const profil = await Profil.update(req.body, { where: { id: id } });

  res.status(200).send(profil);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteProfil = async (req, res) => {
  let id = req.params.id;

  await Profil.destroy({ where: { id: id } });

  res.status(200).send("Le profil est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "profil_pic_";
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
  addProfil,
  getAllProfils,
  getOneProfil,
  updateProfil,
  deleteProfil,
  upload,
};
