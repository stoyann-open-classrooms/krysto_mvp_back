module.exports = (sequelize, DataTypes) => {
  const RecyclableProduct = sequelize.define("recyclableProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    product: {
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
  return RecyclableProduct;
};
