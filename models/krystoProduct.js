module.exports = (sequelize, DataTypes) => {
  const KrystoProduct = sequelize.define("krystoProduct", {
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

    refference: {
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
  return KrystoProduct;
};
