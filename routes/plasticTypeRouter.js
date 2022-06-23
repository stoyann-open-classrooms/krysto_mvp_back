// import controllers
const plasticTypeController = require("../controllers/plasticTypeController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addPlasticType",
  plasticTypeController.upload,
  plasticTypeController.addPlasticType
);

router.get("/allPlasticTypes", plasticTypeController.getAllPlasticTypes);

router.get("/:id", plasticTypeController.getOnePlasticType);
router.put("/:id", plasticTypeController.updatePlasticType);

router.delete("/:id", plasticTypeController.deletePlasticType);

module.exports = router;
