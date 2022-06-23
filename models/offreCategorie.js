module.exports = (sequelize, DataTypes) => {
  const OffreCatgorie = sequelize.define("offreCategorie", {
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

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return OffreCatgorie;
};
