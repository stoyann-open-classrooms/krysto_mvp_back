module.exports = (sequelize, DataTypes) => {
  const Recolte = sequelize.define("recolte", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Recolte;
};
