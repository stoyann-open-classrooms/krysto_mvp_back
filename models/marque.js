module.exports = (sequelize, DataTypes) => {
  const Marque = sequelize.define("marque", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    marque: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  return Marque;
};
