// import controllers
const marqueController = require("../controllers/marqueController");
const marque = require("../models/marque");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addMarque", marqueController.upload, marqueController.addMarque);

router.get("/allMarques", marqueController.getAllMarques);

router.put("/:id", marqueController.updateMarque);

router.delete("/:id", marqueController.deleteMarque);

module.exports = router;
