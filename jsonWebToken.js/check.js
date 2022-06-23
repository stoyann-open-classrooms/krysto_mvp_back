// Dependence
const jwt = require("jsonwebtoken");

// ===========================Extraction du token ========================================

const extractBearer = (authorization) => {
  if (typeof authorization != "string") {
    return false;
  }
  // isolation du token

  const matchers = authorization.match(/(Bearer)\s+(\S+)/i);
  return matchers && matchers[2];
};

// ===========================Vérification de la prèsence du token ========================================

const checkTokenMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      message: "Vous ne disposez pas des droits d'accès pour ces données",
    });
  }
  // verrifier la validité du token

  jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "le token utilisé n'est pas valide !" });
    }
    next();
  });
};

module.exports = checkTokenMiddleware;
