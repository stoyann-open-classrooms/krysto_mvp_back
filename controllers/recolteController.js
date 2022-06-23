const db = require("../models");

// Imports des models
const Recolte = db.recoltes;

// =========================== Poster un trocs ========================================

const addRecolte = async (req, res) => {
  const id = req.params.id;
  let data = {
    plasticTypeId: req.body.plasticTypeId,
    userId: req.body.userId,
    quantite: req.body.quantite,
  };

  const recolte = await Recolte.create(data);
  res.status(200).send(recolte);
};

// =========================== Recuperer la liste de tous les trocs ========================================

const getAllRecoltes = async (req, res) => {
  let recoltes = await Recolte.findAll()
    .then((recoltes) =>
      res.json({
        message: `✅ ${recoltes.length} recolte en base de données`,
        data: recoltes,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneRecolte = async (req, res) => {
  let id = req.params.id;
  let recolte = await Recolte.findOne({ where: { id: id } });
  res.status(200).send(recolte);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateRecolte = async (req, res) => {
  let id = req.params.id;

  const recolte = await Recolte.update(req.body, { where: { id: id } });

  res.status(200).send(recolte);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteRecolte = async (req, res) => {
  let id = req.params.id;

  await Recolte.destroy({ where: { id: id } });

  res.status(200).send("Recolte supprimée !");
};

// =========================== EXPORT ========================================

module.exports = {
  addRecolte,
  getAllRecoltes,
  getOneRecolte,
  updateRecolte,
  deleteRecolte,
};
