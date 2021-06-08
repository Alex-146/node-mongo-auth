
const jwt = require("jsonwebtoken");

const { secret } = require("../config/jwt");

function validateToken(req, res, next) {
  
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (token) {
      jwt.verify(token, secret, (error, data) => {
        if (error) {
          return res.status(401).json({
            ok: false,
            message: "verify error",
            error
          });
        }
        else {
          req.user = data;
          next();
        }
      });
    }
    else {
      return res.status(401).json({
        ok: false, 
        message: "no token"
      });
    }
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false, 
      message: "validateToken error", 
      error: { name, message } 
    });
  }
  
}

function roleAccess(acceptedRoles) {
  return function(req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
  
    try {
      const token = req.headers["authorization"]?.split(" ")[1];

      if (token) {
        jwt.verify(token, secret, (error, data) => {
          if (error) {
            return res.status(401).json({
              ok: false,
              message: "verify error",
              error
            });
          }
          else {
            const { roles } = data;
            const valid = roles.some(r => acceptedRoles.includes(r));
            if (valid) {
              next();
            }
            else {
              return res.status(401).json({
                ok: false, 
                message: "no access for your role"
              });
            }
          }
        });
      }
      else {
        return res.status(401).json({
          ok: false, 
          message: "no token via roles"
        });
      }
    }
    catch(error) {
      const { name, message } = error;
      return res.status(500).json({
        ok: false, 
        message: "roleAccess error", 
        error: { name, message }
      });
    }
  }
}

module.exports = {
  validateToken, roleAccess
}
