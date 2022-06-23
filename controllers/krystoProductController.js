const db = require("../models");

// Imports des models
const KrystoProduct = db.krystoProducts;

// image Upload
const multer = require("multer");
const path = require("path");
const { krystoProducts } = require("../models");

// =========================== Poster un trocs ========================================

const addKrystoProduct = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    nom: req.body.nom,
    plasticTypeId: req.body.plasticTypeId,
    refference: req.body.refference,
    description: req.body.description,
  };

  const krystoProduct = await KrystoProduct.create(data);
  res.status(200).send(krystoProduct);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllKrystoProducts = async (req, res) => {
  let krystoProducts = await KrystoProduct.findAll()
    .then((krystoProducts) =>
      res.json({
        message: `✅ ${krystoProducts.length} produit krysto en base de données`,
        data: krystoProducts,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneKrystoProduct = async (req, res) => {
  let id = req.params.id;
  let krystoProduct = await KrystoProduct.findOne({ where: { id: id } });
  res.status(200).send(krystoProduct);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateKrystoProduct = async (req, res) => {
  let id = req.params.id;

  const krystoProduct = await KrystoProduct.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(krystoProduct);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteKrystoProduct = async (req, res) => {
  let id = req.params.id;

  await KrystoProduct.destroy({ where: { id: id } });

  res.status(200).send("Le produit krysto est supprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "produit_krysto_";
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
  addKrystoProduct,
  getAllKrystoProducts,
  getOneKrystoProduct,
  updateKrystoProduct,
  deleteKrystoProduct,
  upload,
};
