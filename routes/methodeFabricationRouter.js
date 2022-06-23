// import controllers
const methodeFabriquationController = require("../controllers/methodeFabricationController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addMethodeFabrication",
  methodeFabriquationController.upload,
  methodeFabriquationController.addMethodeFabrication
);

router.get(
  "/allMethodeFabrications",
  methodeFabriquationController.getAllMethodeFabrications
);

router.get("/:id", methodeFabriquationController.getOneMethodeFabrication);
router.put("/:id", methodeFabriquationController.updateMethodeFabrication);

router.delete("/:id", methodeFabriquationController.deleteKMethodeFabrication);

module.exports = router;
