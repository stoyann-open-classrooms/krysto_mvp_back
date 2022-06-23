const profilController = require("../controllers/profilController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addProfil", profilController.upload, profilController.addProfil);

router.get("/allProfils", profilController.getAllProfils);

router.get("/:id", profilController.getOneProfil);
router.put("/:id", profilController.updateProfil);

router.delete("/:id", profilController.deleteProfil);

module.exports = router;
