const trocController = require("../controllers/trocController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addTroc", trocController.upload, trocController.addTroc);

router.get("/allTrocs", trocController.getAllTrocs);

router.get("/:id", trocController.getOneTroc);
router.put("/:id", trocController.updateTroc);

router.delete("/:id", trocController.deleteTroc);

module.exports = router;
