module.exports = (sequelize, DataTypes) => {
  const Troc = sequelize.define("troc", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    titre: {
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
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Troc;
};
