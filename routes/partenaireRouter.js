const partenaireController = require("../controllers/partenaireController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addPartenaire",
  partenaireController.upload,
  partenaireController.addPartenaire
);

router.get("/allPartenaires", partenaireController.getAllPartenaires);

router.get("/:id", partenaireController.getOnePartenaire);
router.put("/:id", partenaireController.updatePartenaire);

router.delete("/:id", partenaireController.deletePartenaire);

module.exports = router;
