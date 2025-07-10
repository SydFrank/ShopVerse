/**
 * Generates a JSON Web Token (JWT) containing the provided payload data.
 *
 * @param {Object} data - The payload to encode into the token (e.g., user ID, email).
 * @returns {Promise<string>} A Promise that resolves to a signed JWT string.
 *
 * The token is signed using the secret key defined in the environment variable `process.env.SECRET`
 * and is set to expire in 7 days. This function is typically used for issuing authentication tokens
 * after a user successfully logs in.
 *
 * Example usage:
 * const token = await createToken({ _id: user._id, email: user.email });
 */

const jwt = require("jsonwebtoken");

module.exports.createToken = async (data) => {
  const token = await jwt.sign(data, process.env.SECRET, {
    expiresIn: "7d",
  });
  return token;
};
