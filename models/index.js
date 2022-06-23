const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");
const recyclableProduct = require("./recyclableProduct");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
///====================== synchronisation des models

//  modele users
db.users = require("./user.js")(sequelize, DataTypes);
db.profils = require("./profil")(sequelize, DataTypes);
db.trocs = require("./troc")(sequelize, DataTypes);
db.villes = require("./ville")(sequelize, DataTypes);
db.trocTransactions = require("./trocTransaction")(sequelize, DataTypes);

//  modele plastic types
db.plasticTypes = require("./plasticType")(sequelize, DataTypes);
//  modele recyclables products
db.recyclableProducts = require("./recyclableProduct")(sequelize, DataTypes);
//  modele marques
db.marques = require("./marque")(sequelize, DataTypes);
//  modele partenaires
db.partenaires = require("./partenaire")(sequelize, DataTypes);
//  modele offre
db.offres = require("./offre")(sequelize, DataTypes);
//  modele offreCategorie
db.offreCategories = require("./offreCategorie")(sequelize, DataTypes);
db.trocCategories = require("./trocCategorie")(sequelize, DataTypes);
//  modele transactionOffres
db.transactionOffres = require("./TransactionOffre")(sequelize, DataTypes);

// modele Krysto product
db.krystoProducts = require("./krystoProduct")(sequelize, DataTypes);
// modele product categories
db.krystoProductCategories = require("./krystoProductCategorie")(
  sequelize,
  DataTypes
);
// modele methode fabrications
db.methodeFabrications = require("./methodeFabrication")(sequelize, DataTypes);
// modele recolte
db.recoltes = require("./recolte")(sequelize, DataTypes);
// modele transaction
db.transactions = require("./transaction")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("base de donnée synchroniser!");
});

// ================= RELATIONS OK =============

// ======  relation one to one between recolte et transaction =====
db.transactions.hasOne(db.recoltes);

db.trocs.hasMany(db.trocTransactions);
db.trocTransactions.belongsTo(db.trocTransactions);

db.trocCategories.hasMany(db.trocs);
db.trocs.belongsTo(db.trocCategories);

db.profils.hasMany(db.trocTransactions);
db.trocTransactions.belongsTo(db.profils);

db.villes.hasMany(db.profils);
db.profils.belongsTo(db.villes);

// ======  relation one to many between  plastic types et recoltes =====

db.plasticTypes.hasMany(db.recoltes);
db.recoltes.belongsTo(db.plasticTypes);
// ======  relation one to many between  partenaires et offres=====

db.partenaires.hasMany(db.offres);
db.offres.belongsTo(db.partenaires);
// ======  relation one to many between  offres et catègorie =====

db.offreCategories.hasMany(db.offres);
db.offres.belongsTo(db.offreCategories);
// ======  relation one to many between  offres et offre Transactio =====

db.offres.hasMany(db.transactionOffres);
db.transactionOffres.belongsTo(db.offres);
// ======  relation one to many between  offres et offre Transactio =====

db.profils.hasMany(db.transactionOffres);
db.transactionOffres.belongsTo(db.profils);
// ======  relation one to many between  offres et offre Transactio =====

db.profils.hasMany(db.trocs);
db.trocs.belongsTo(db.profils);
// ======  relation one to many between  plastic types et recoltes =====

db.profils.hasMany(db.recoltes);
db.recoltes.belongsTo(db.profils);

// ======  relation one to many between user et krysto contacts =====

db.users.hasMany(db.profils);
db.profils.belongsTo(db.users);
// ======  relation one to many between krysto product et krysto product categories =====

db.krystoProductCategories.hasMany(db.krystoProducts);
db.krystoProducts.belongsTo(db.krystoProductCategories);

// ======  relation one to many between krysto product et plastic types =====

db.plasticTypes.hasMany(db.krystoProducts);
db.krystoProducts.belongsTo(db.plasticTypes);

// ======  relation one to many between krysto product et methode de fabrication =====

db.methodeFabrications.hasMany(db.krystoProducts);
db.krystoProducts.belongsTo(db.methodeFabrications);

// ======  relation one to many  marques et recyclable product =====

db.marques.hasMany(db.recyclableProducts);
db.recyclableProducts.belongsTo(db.marques);

// ======  relation many to many between recyclable product et plastic types =====

db.recyclableProducts.belongsToMany(db.plasticTypes, {
  through: "recyclableProduct_plasticTypes",
  uniqueKey: "unique_key",
});

db.plasticTypes.belongsToMany(db.recyclableProducts, {
  through: "recyclableProduct_plasticTypes",
  uniqueKey: "unique_key",
});

module.exports = db;
