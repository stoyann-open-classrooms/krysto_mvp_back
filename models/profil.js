module.exports = (sequelize, DataTypes) => {
  const Profil = sequelize.define("profil", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },

    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "cette uttilisateur n'a pas encore de déscription",
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Profil;
};
