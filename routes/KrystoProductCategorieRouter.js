// import controllers
const krystoProductCategorieController = require("../controllers/krystoProductCategorieController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addKrystoProductCategorie",
  krystoProductCategorieController.upload,
  krystoProductCategorieController.addKrystoProductCategorie
);

router.get(
  "/allKrystoProductCategories",
  krystoProductCategorieController.getAllKrystoProductCategories
);

router.get(
  "/:id",
  krystoProductCategorieController.getOneKrystoProductCategorie
);
router.put(
  "/:id",
  krystoProductCategorieController.updateKrystoProductCategorie
);

router.delete(
  "/:id",
  krystoProductCategorieController.deleteKrystoProductCategorie
);

module.exports = router;
