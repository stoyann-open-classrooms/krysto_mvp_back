const villeController = require("../controllers/villeController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addVille", villeController.addVille);

router.get("/allVilles", villeController.getAllVilles);

router.get("/:id", villeController.getOneVille);
router.put("/:id", villeController.updateVille);

router.delete("/:id", villeController.deleteVille);

module.exports = router;
