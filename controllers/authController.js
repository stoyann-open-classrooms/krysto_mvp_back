// Dependence
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  =========== Imports des models
const User = db.users;

// =========================== Login User ========================================

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("  ⛔️ ⛔️  Bad email or password ⛔️⛔️ ");
  }
  try {
    let user = await User.findOne({
      where: { email: email },
      raw: true,
    });

    //verification du mot de passe

    if (user === null) {
      return res.status(400).json({
        message: " ⛔️ ⛔️  Ce compte n'existe pas !  ⛔️ ⛔️  ",
      });
    }
    bcrypt.compare(password, user.password).then((test) => {
      if (!test) {
        return res.status(401).send("  ⛔️⛔️ Mot de passe incorrecte ⛔️⛔️");
      }

      // generation du web token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      return res.json({
        message: " ✅✅ l'uttilisateur est authentifié ✅✅ ",
        access_token: token,
        user_info: user,
      });
    });
  } catch (err) {
    res.status(500).send("⛔️⛔️ Erreur Database  ⛔️⛔️");
    res
      .status(500)
      .send(" ⛔️⛔️ Une erreur, s'est produit veuillez réessayer ⛔️⛔️ ");
  }
};

// =========================== EXPORT ========================================

module.exports = {
  login,
};
