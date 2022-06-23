const recolteController = require("../controllers/recolteController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addRecolte", recolteController.addRecolte);

router.get("/allRecoltes", recolteController.getAllRecoltes);

router.get("/:id", recolteController.getOneRecolte);
router.put("/:id", recolteController.updateRecolte);

router.delete("/:id", recolteController.deleteRecolte);

module.exports = router;
