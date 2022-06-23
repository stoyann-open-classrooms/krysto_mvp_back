const db = require("../models");

// Imports des models
const MethodeFabrication = db.methodeFabrications;

// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addMethodeFabrication = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    machine: req.body.machine,
    description: req.body.description,
  };

  const methodeFabrication = await MethodeFabrication.create(data);
  res.status(200).send(methodeFabrication);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllMethodeFabrications = async (req, res) => {
  let methodeFabrications = await MethodeFabrication.findAll()
    .then((methodeFabrications) =>
      res.json({
        message: `✅ ${methodeFabrications.length} methodes  en base de données`,
        data: methodeFabrications,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneMethodeFabrication = async (req, res) => {
  let id = req.params.id;
  let methodeFabrication = await MethodeFabrication.findOne({
    where: { id: id },
  });
  res.status(200).send(methodeFabrication);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateMethodeFabrication = async (req, res) => {
  let id = req.params.id;

  const methodeFabrication = await MethodeFabrication.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(methodeFabrication);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteKMethodeFabrication = async (req, res) => {
  let id = req.params.id;

  await MethodeFabrication.destroy({ where: { id: id } });

  res.status(200).send("La methode  est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "methode_fabrication_";
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
  addMethodeFabrication,
  getAllMethodeFabrications,
  getOneMethodeFabrication,
  updateMethodeFabrication,
  deleteKMethodeFabrication,
  upload,
};
