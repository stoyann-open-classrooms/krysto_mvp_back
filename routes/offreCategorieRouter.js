// import controllers
const offreCategorieController = require("../controllers/offreCategorieController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addOffreCategorie",
  offreCategorieController.upload,
  offreCategorieController.addOffreCategorie
);

router.get(
  "/allOffreCategories",
  offreCategorieController.getAllOffreCategories
);

router.get("/:id", offreCategorieController.getOneOffreCategorie);
router.put("/:id", offreCategorieController.updateOffreCategorie);

router.delete("/:id", offreCategorieController.deleteOffreCategorie);

module.exports = router;
