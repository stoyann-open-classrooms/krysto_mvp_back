const db = require("../models");

// Imports des models
const RecyclableProduct = db.recyclableProducts;
const Marque = db.marques;
const PlasticType = db.plasticTypes;
const RecyclableProductPlasticType = db.recyclableProductPlasticTypes;
// image Upload
const multer = require("multer");
const path = require("path");

// =========================== Poster un trocs ========================================

const addRecyclableProduct = async (req, res) => {
  const id = req.params.id;
  let data = {
    image: req.file.path,
    product: req.body.product,
    description: req.body.description,
    refference: req.body.refference,
    marqueId: req.body.marqueId,
  };

  const recyclableProduct = await RecyclableProduct.create(data);
  res.status(200).send(recyclableProduct);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllRecyclableProducts = async (req, res) => {
  let recyclableProducts = await RecyclableProduct.findAll({
    include: {
      model: PlasticType,
      as: "plasticTypes",
    },
  })

    .then((recyclableProducts) =>
      res.json({
        message: `✅ ${recyclableProducts.length} produits recyclable en base de données`,
        data: recyclableProducts,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== Recuperer un troc via son ID ========================================
const getOneRecyclableProduct = async (req, res) => {
  let id = req.params.id;
  let recyclableProduct = await RecyclableProduct.findOne({
    where: { id: id },
  });
  res.status(200).send(recyclableProduct);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateRecyclableProduct = async (req, res) => {
  let id = req.params.id;

  const recyclableProduct = await RecyclableProduct.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(recyclableProduct);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteRecyclableProduct = async (req, res) => {
  let id = req.params.id;

  await RecyclableProduct.destroy({ where: { id: id } });

  res.status(200).send("Le produit recyclable est suprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER's ========================================

const im = "troc_image_";
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
  addRecyclableProduct,
  getAllRecyclableProducts,
  getOneRecyclableProduct,
  deleteRecyclableProduct,
  updateRecyclableProduct,

  upload,
};
