// import controllers
const recyclableProductController = require("../controllers/recyclableProductController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addRecyclableProduct",
  recyclableProductController.upload,
  recyclableProductController.addRecyclableProduct
);

router.get(
  "/allRecyclableProducts",
  recyclableProductController.getAllRecyclableProducts
);

router.get("/:id", recyclableProductController.getOneRecyclableProduct);
router.put("/:id", recyclableProductController.updateRecyclableProduct);

router.delete("/:id", recyclableProductController.deleteRecyclableProduct);

module.exports = router;
