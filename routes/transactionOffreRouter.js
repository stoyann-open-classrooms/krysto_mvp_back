const transactionOffreController = require("../controllers/transactionOffreController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addTransactionOffre",
  transactionOffreController.addTransactionOffre
);

router.get(
  "/allTransactionOffres",
  transactionOffreController.getAllTransactionOffres
);

router.get("/:id", transactionOffreController.getOneTransactionOffre);
router.put("/:id", transactionOffreController.updateTransactionOffre);

router.delete("/:id", transactionOffreController.deleteTransactionOffre);

module.exports = router;
