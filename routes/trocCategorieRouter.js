// import controllers
const trocCategorieController = require("../controllers/trocCategorieController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addTrocCategorie",
  trocCategorieController.upload,
  trocCategorieController.addTrocCategorie
);

router.get("/allTrocCategories", trocCategorieController.getAllTrocCategories);

router.get("/:id", trocCategorieController.getOneTrocCategorie);
router.put("/:id", trocCategorieController.updateTrocCategorie);

router.delete("/:id", trocCategorieController.deleteTrocCategorie);

module.exports = router;
