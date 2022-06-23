const trocTransactionController = require("../controllers/trocTransactionController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addTrocTransaction",
  trocTransactionController.addTrocTransaction
);

router.get(
  "/allTrocTransactions",
  trocTransactionController.getAllTrocTransactions
);

router.get("/:id", trocTransactionController.getOneTrocTransaction);
router.put("/:id", trocTransactionController.updateTrocTransaction);

router.delete("/:id", trocTransactionController.deleteTrocTransaction);

module.exports = router;
