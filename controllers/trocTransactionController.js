const db = require("../models");

// Imports des models
const TrocTransaction = db.trocTransactions;

// =========================== Poster un trocs ========================================

const addTrocTransaction = async (req, res) => {
  const id = req.params.id;
  let data = {
    montant: req.body.montant,
  };

  const trocTransaction = await TrocTransaction.create(data);
  res.status(200).send(trocTransaction);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllTrocTransactions = async (req, res) => {
  let trocTransactions = await TrocTransaction.findAll()
    .then((TrocTransactions) =>
      res.json({
        message: `✅ ${TrocTransactions.length} transaction en base de données`,
        data: trocTransactions,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneTrocTransaction = async (req, res) => {
  let id = req.params.id;
  let trocTransaction = await TrocTransaction.findOne({ where: { id: id } });
  res.status(200).send(trocTransaction);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateTrocTransaction = async (req, res) => {
  let id = req.params.id;

  const trocTransaction = await TrocTransaction.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(trocTransaction);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteTrocTransaction = async (req, res) => {
  let id = req.params.id;

  await TrocTransaction.destroy({ where: { id: id } });

  res.status(200).send("Transaction supprimée !");
};

// =========================== EXPORT ========================================

module.exports = {
  addTrocTransaction,
  getAllTrocTransactions,
  getOneTrocTransaction,
  updateTrocTransaction,
  deleteTrocTransaction,
};
