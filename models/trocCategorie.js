module.exports = (sequelize, DataTypes) => {
  const TrocCategorie = sequelize.define("TrocCategorie", {
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
  return TrocCategorie;
};
