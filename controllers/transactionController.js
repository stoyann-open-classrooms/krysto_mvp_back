const db = require("../models");

// Imports des models
const Transaction = db.transactions;

// =========================== Poster un trocs ========================================

const addTransaction = async (req, res) => {
  const id = req.params.id;
  let data = {
    montant: req.body.montant,
  };

  const transaction = await Transaction.create(data);
  res.status(200).send(transaction);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllTransactions = async (req, res) => {
  let transactions = await Transaction.findAll()
    .then((transactions) =>
      res.json({
        message: `✅ ${transactions.length} transaction en base de données`,
        data: transactions,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneTransaction = async (req, res) => {
  let id = req.params.id;
  let transaction = await Transaction.findOne({ where: { id: id } });
  res.status(200).send(transaction);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateTransaction = async (req, res) => {
  let id = req.params.id;

  const transaction = await Transaction.update(req.body, { where: { id: id } });

  res.status(200).send(transaction);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteTransaction = async (req, res) => {
  let id = req.params.id;

  await Transaction.destroy({ where: { id: id } });

  res.status(200).send("Transaction supprimée !");
};

// =========================== EXPORT ========================================

module.exports = {
  addTransaction,
  getAllTransactions,
  getOneTransaction,
  updateTransaction,
  deleteTransaction,
};
