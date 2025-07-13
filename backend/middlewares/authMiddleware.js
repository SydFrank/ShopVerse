// Import the 'jsonwebtoken' library to handle JWT verification
const jwt = require("jsonwebtoken");

/**
 * Authentication middleware to protect secured routes.
 * -----------------------------------------------------
 * Extracts the access token from cookies sent by the client.
 * Typically used after a user has logged in and the token has been set in cookies.
 * This middleware does not yet verify the token — further logic should be added
 * to validate the token and attach user info to the request object.
 *
 * @param {Object} req  - The incoming request object
 * @param {Object} res  - The outgoing response object
 * @param {Function} next - Function to pass control to the next middleware
 */

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // Token missing — reject request
  if (!accessToken) {
    return res.status(409).json({ error: "Please Login First" });
  } else {
    try {
      // Verify token and decode the payload
      const deCodeToken = await jwt.verify(accessToken, process.env.SECRET);

      // Attach useful user info to the request object
      req.role = deCodeToken.role;
      req.id = deCodeToken.id;

      // Proceed to the next middleware or controller
      next();
    } catch (error) {
      // Token is invalid or expired — deny access
      return res.status(409).json({ error: "Please Login" });
    }
  }
};
