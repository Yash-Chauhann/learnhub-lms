const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // token format: Bearer xyz
    const actualToken = token.split(" ")[1];

    const verified = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = verified; // user id store
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;