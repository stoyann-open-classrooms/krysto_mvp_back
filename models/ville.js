module.exports = (sequelize, DataTypes) => {
  const Ville = sequelize.define("ville", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ville: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Ville;
};
