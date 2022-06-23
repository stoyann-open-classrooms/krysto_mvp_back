module.exports = (sequelize, DataTypes) => {
  const TrocTransaction = sequelize.define("trocTransaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    montant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return TrocTransaction;
};
