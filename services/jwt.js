import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
   console.log(req.headers);
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(' ')[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, "require_payziff_secretkey");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
    } else {
      res.status(401).send("require authentication token");
    }
  };