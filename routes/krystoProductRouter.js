// import controllers
const krystoProductController = require("../controllers/krystoProductController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addKrystoProduct",
  krystoProductController.upload,
  krystoProductController.addKrystoProduct
);

router.get("/allKrystoProducts", krystoProductController.getAllKrystoProducts);

router.get("/:id", krystoProductController.getOneKrystoProduct);
router.put("/:id", krystoProductController.updateKrystoProduct);

router.delete("/:id", krystoProductController.deleteKrystoProduct);

module.exports = router;
