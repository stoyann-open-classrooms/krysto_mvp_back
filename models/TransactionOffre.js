module.exports = (sequelize, DataTypes) => {
  const TransactionOffre = sequelize.define("transactionOffre", {
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
  return TransactionOffre;
};
