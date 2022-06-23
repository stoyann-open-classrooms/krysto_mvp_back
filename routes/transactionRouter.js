const transactionController = require("../controllers/transactionController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addTransaction", transactionController.addTransaction);

router.get("/allTransactions", transactionController.getAllTransactions);

router.get("/:id", transactionController.getOneTransaction);
router.put("/:id", transactionController.updateTransaction);

router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
