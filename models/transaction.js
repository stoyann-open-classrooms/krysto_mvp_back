module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
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
  return Transaction;
};
