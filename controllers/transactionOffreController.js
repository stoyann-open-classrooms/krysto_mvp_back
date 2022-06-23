const db = require("../models");

// Imports des models
const TransactionOffre = db.transactionOffres;

// =========================== Poster un trocs ========================================

const addTransactionOffre = async (req, res) => {
  const id = req.params.id;
  let data = {
    montant: req.body.montant,
  };

  const transactionOffre = await TransactionOffre.create(data);
  res.status(200).send(transactionOffre);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllTransactionOffres = async (req, res) => {
  let transactionOffres = await TransactionOffre.findAll()
    .then((transactionOffres) =>
      res.json({
        message: `✅ ${transactionOffres.length} transaction en base de données`,
        data: transactionOffres,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneTransactionOffre = async (req, res) => {
  let id = req.params.id;
  let transactionOffre = await TransactionOffre.findOne({ where: { id: id } });
  res.status(200).send(transactionOffre);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateTransactionOffre = async (req, res) => {
  let id = req.params.id;

  const transactionOffre = await TransactionOffre.update(req.body, {
    where: { id: id },
  });

  res.status(200).send(transactionOffre);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteTransactionOffre = async (req, res) => {
  let id = req.params.id;

  await TransactionOffre.destroy({ where: { id: id } });

  res.status(200).send("Transaction supprimée !");
};

// =========================== EXPORT ========================================

module.exports = {
  addTransactionOffre,
  getAllTransactionOffres,
  getOneTransactionOffre,
  updateTransactionOffre,
  deleteTransactionOffre,
};
