const db = require("../models");

// Imports des models
const Ville = db.villes;

// =========================== Poster un trocs ========================================

const addVille = async (req, res) => {
  const id = req.params.id;
  let data = {
    ville: req.body.ville,
  };

  const ville = await Ville.create(data);
  res.status(200).send(ville);
};
// =========================== Recuperer la liste de tous les trocs ========================================

const getAllVilles = async (req, res) => {
  let villes = await Ville.findAll()
    .then((villes) =>
      res.json({
        message: `✅ ${villes.length} ville en base de données`,
        data: villes,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// ========================= Recuperer un troc via son ID ========================================
const getOneVille = async (req, res) => {
  let id = req.params.id;
  let ville = await Ville.findOne({ where: { id: id } });
  res.status(200).send(ville);
};

// =========================== Modifier  un fournisseur via son ID ========================================

const updateVille = async (req, res) => {
  let id = req.params.id;

  const ville = await Ville.update(req.body, { where: { id: id } });

  res.status(200).send(ville);
};

// =========================== Supprimer un troc via son ID ========================================
const deleteVille = async (req, res) => {
  let id = req.params.id;

  await Ville.destroy({ where: { id: id } });

  res.status(200).send("La ville est supprimée !");
};

// =========================== EXPORT ========================================

module.exports = {
  addVille,
  getOneVille,
  getAllVilles,
  updateVille,
  deleteVille,
};
