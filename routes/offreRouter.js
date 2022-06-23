const offreController = require("../controllers/offreController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addOffre", offreController.upload, offreController.addOffre);

router.get("/allOffres", offreController.getAllOffres);

router.get("/:id", offreController.getOneOffre);
router.put("/:id", offreController.updateOffre);

router.delete("/:id", offreController.deleteOffre);

module.exports = router;
