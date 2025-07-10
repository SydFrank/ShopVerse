const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrpty = require("bcrypt");
const { createToken } = require("../utils/tokenCreate");
// Define the authControllers class to handle authentication-related logic
class authControllers {
  /**
   * Handles the admin login process.
   *
   * Steps:
   * 1. Extracts email and password from the request body.
   * 2. Looks up the admin in the database using the provided email.
   * 3. If the admin exists, compares the provided password with the hashed password.
   * 4. If the password matches, generates a JWT token and sets it in an HTTP-only cookie.
   * 5. Returns a successful login response with the token and a message.
   * 6. Handles failure cases with appropriate error responses.
   *
   * @param {import('express').Request} req - The HTTP request object, expected to contain `email` and `password` in the body.
   * @param {import('express').Response} res - The HTTP response object used to return results to the client.
   * @returns {Promise<void>}
   */

  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find the admin by email and explicitly select the password field
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log(admin);

      if (admin) {
        // Compare the hashed password with the user input
        const match = await bcrpty.compare(password, admin.password);
        // console.log(match);

        if (match) {
          // Generate a JWT token with user ID and role
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });

          // Set token in a cookie with 7-day expiration
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          // Send a success response
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          // Incorrect password
          responseReturn(res, 400, { error: "Password wrong" });
        }
      } else {
        // Email not found in database
        responseReturn(res, 400, { error: "Email not found" });
      }
    } catch (error) {
      // Internal server error
      responseReturn(res, 500, { error: error.message });
    }
  };
}
// End Method

// Export an instance of the authControllers class for use in routing
module.exports = new authControllers();
