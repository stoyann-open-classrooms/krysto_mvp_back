module.exports = (sequelize, DataTypes) => {
  const Offre = sequelize.define("offre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return Offre;
};
