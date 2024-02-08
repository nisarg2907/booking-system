const jwt = require("jsonwebtoken");

// Generating Toekn for the user who registers

const generateJwtToken = (userData, secretKey) => {
  const payload = {
    name: userData.name,
    email: userData.email,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "100d" });

  return `Bearer ${token}`;
};

module.exports = generateJwtToken;
