const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create main Model
const User = db.users;

// =========================== Ajouter un utilisateur & (hachage du mot de passe en base de données) ========================================

const addUser = async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
  };

  let user = await User.findOne({
    where: { email: info.email },
    raw: true,
  }).then((user) => {
    // ============>   Vérification si l'utilisateur existe déjà
    if (user !== null) {
      return res.status(409).json({
        message: `⛔️Un utilisateur est déjà inscrit avec cet e-mail !⛔️`,
      });
    }

    // ============>  hachage du mot de passe de l'utilisateur

    bcrypt
      .hash(info.password, 10)
      .then((hash) => {
        info.password = hash;

        // generation du web token
        const token = jwt.sign(
          {
            id: info.id,
            email: info.email,
          },
          process.env.JWT_SECRET
        );

        // ============>  Création  de l'utilisateur

        User.create(info)
          .then((user) =>
            res.json({
              message: " ✅ Nouvel utilisateur créé ✅ ",
              data: user,
              token: token,
            })
          )
          .catch((err) =>
            res.status(50).json({
              message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
              error: err,
            })
          );
      })

      .catch((err) =>
        res.status(500).json({
          message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
          error: err,
        })
      );
  });
};

// =========================== Recuperer la liste de tous les uttilisateur(s) ========================================
const getAllUsers = async (req, res) => {
  let users = await User.findAll({ attributes: ["id", "email"] })
    .then((users) =>
      res.json({
        message: ` ✅${users.length} uttilisateur(s) en base de données`,
        data: users,
      })
    )
    .catch((err) =>
      res.status(500).json({
        message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
      })
    );
};

// =========================== Recuperer un utilisateur via son ID ========================================

const getOneUser = async (req, res) => {
  let userId = parseInt(req.params.id);

  if (!userId) {
    return res.json(400).json({ message: " ⛔️ Missing parameter" });
  }
  //Récuperation de l'uttilisateur
  User.findOne({
    where: { id: userId },
    attributes: ["id", "email"],
    raw: true,
  })
    .then((user) => {
      if (user === null) {
        return res
          .status(404)
          .json({ message: " ⛔️ Cet utilisateur n'existe pas !" });
      }
      // Uttilisateur trouvée
      return res.json({ data: user });
    })
    .catch((err) =>
      res.status(500).json({
        message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
      })
    );
};

// =========================== Modifier un uttilisateur via son ID  ========================================
const updateUser = async (req, res) => {
  let id = req.params.id;

  const user = await User.update(req.body, { where: { id: id } });

  res.status(200).send(user);
};

// =========================== Supprimer un uttilisateur via son ID  ========================================

const deleteUser = async (req, res) => {
  let id = req.params.id;

  await User.destroy({ where: { id: id } });

  res.status(200).send("user is deleted !");
};

// =========================== EXPORTS ========================================

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
