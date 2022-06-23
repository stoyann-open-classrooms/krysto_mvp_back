const express = require("express");
const cors = require("cors");
const app = express();
const checkTokenMiddleware = require("./jsonWebToken.js/check");

// ==========================   middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================================static Images Folder
app.use("/Images", express.static("./Images"));

//  ===========================================================   routers

// user
const userRouter = require("./routes/userRouter");
app.use(`${process.env.BASE_URL}/users`, userRouter);
// auth
const authRouter = require("./routes/authRouter.js");
app.use(`${process.env.BASE_URL}/auth`, authRouter);

const marqueRouter = require("./routes/marqueRouter");
app.use(`${process.env.BASE_URL}/marques`, marqueRouter);

const plasticTypeRouter = require("./routes/plasticTypeRouter");
app.use(`${process.env.BASE_URL}/plasticTypes`, plasticTypeRouter);
const recyclableProductsRouter = require("./routes/recyclableProductsRouter");
app.use(`${process.env.BASE_URL}/recyclableProducts`, recyclableProductsRouter);
const krystoProductRouter = require("./routes/krystoProductRouter");
app.use(`${process.env.BASE_URL}/krystoProducts`, krystoProductRouter);
const krystoProductCategorieRouter = require("./routes/KrystoProductCategorieRouter");
app.use(
  `${process.env.BASE_URL}/krystoProductCategories`,
  krystoProductCategorieRouter
);
const methodeFabricationRouter = require("./routes/methodeFabricationRouter");
app.use(
  `${process.env.BASE_URL}/methodeFabrications`,
  methodeFabricationRouter
);
const offreRouter = require("./routes/offreRouter");
app.use(`${process.env.BASE_URL}/offres`, offreRouter);
const offreCategorieRouter = require("./routes/offreCategorieRouter");
app.use(`${process.env.BASE_URL}/offreCategories`, offreCategorieRouter);
const partenaireRouter = require("./routes/partenaireRouter");
app.use(`${process.env.BASE_URL}/partenaires`, partenaireRouter);
const profilRouter = require("./routes/profilRouter");
app.use(`${process.env.BASE_URL}/profils`, checkTokenMiddleware, profilRouter);
const recolteRouter = require("./routes/recolteRouter");
app.use(`${process.env.BASE_URL}/recoltes`, recolteRouter);
const transactionRouter = require("./routes/transactionRouter");
app.use(`${process.env.BASE_URL}/transactions`, transactionRouter);
const transactionOffreRouter = require("./routes/transactionOffreRouter");
app.use(`${process.env.BASE_URL}/transactionOffres`, transactionOffreRouter);
const trocRouter = require("./routes/trocRouter");
app.use(`${process.env.BASE_URL}/trocs`, trocRouter);
const trocTransactionRouter = require("./routes/trocTransactionRouter");
app.use(`${process.env.BASE_URL}/trocTransactions`, trocTransactionRouter);
const trocCategorieRouter = require("./routes/trocCategorieRouter");
app.use(`${process.env.BASE_URL}/trocCategories`, trocCategorieRouter);
const villeRouter = require("./routes/villeRouter");
app.use(`${process.env.BASE_URL}/villes`, villeRouter);

// ++++++++++++++++++++++++++++ demmarage du serveur  ++++++++++++++++++++++++++++
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    ` ✅✅✅✅✅✅✅✅  Le serveur est demmarée sur le port : ${process.env.SERVER_PORT} ✅✅✅✅✅✅✅✅ `
  );
});
// TODO securisation de l'api et authentification 2FA

// https://blog.arcoptimizer.com/creation-de-flux-de-mots-de-passe-securises-avec-nodejs-et-mysql
