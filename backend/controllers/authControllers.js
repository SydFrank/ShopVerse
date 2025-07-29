const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const { responseReturn } = require("../utils/response");
const bcrpty = require("bcrypt");
const { createToken } = require("../utils/tokenCreate");

// Define the authControllers class to handle authentication-related logic
class authControllers {
  /**
   * Admin login controller
   *
   * Steps:
   * 1. Extract email and password from the request body.
   * 2. Find the admin using the email.
   * 3. Compare input password with hashed password in DB.
   * 4. If matched, create a JWT token and set it in an HTTP-only cookie.
   * 5. Return success response; otherwise, handle invalid credentials.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find admin and include password field for comparison
      const admin = await adminModel.findOne({ email }).select("+password");

      if (admin) {
        // Compare provided password with hashed password
        const match = await bcrpty.compare(password, admin.password);

        if (match) {
          // Generate JWT with admin ID and role
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });

          // Set token in cookie, valid for 7 days
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          // Send success response
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          // Password mismatch
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        // Admin not found
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      // Log and return server error
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End of admin_login method

  /**
   * Seller registration controller
   *
   * Steps:
   * 1. Extract name, email, and password from request.
   * 2. Check if seller email already exists.
   * 3. If not, hash password and create seller in DB.
   * 4. Also create corresponding chat customer model.
   * 5. Generate token and set cookie for session.
   * 6. Return success response.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  seller_register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
      // Check for existing seller
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        return responseReturn(res, 404, { error: "Email already exists" });
      } else {
        // Create seller with hashed password and default fields
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrpty.hash(password, 10),
          method: "manual",
          shopInfo: {},
        });

        // Create seller-customer chat model entry
        await sellerCustomerModel.create({
          myId: seller.id,
        });

        // Generate JWT token
        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });

        // Set token in HTTP-only cookie
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        return responseReturn(res, 201, {
          token,
          message: "Registered successfully",
        });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of seller_register method

  /**
   * Seller login controller
   *
   * Steps:
   * 1. Extract email and password from the request body.
   * 2. Find the seller using the email.
   * 3. Compare input password with hashed password in DB.
   * 4. If matched, create a JWT token and set it in an HTTP-only cookie.
   * 5. Return success response; otherwise, handle invalid credentials.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find seller and include password field for comparison
      const seller = await sellerModel.findOne({ email }).select("+password");

      if (seller) {
        // Compare provided password with hashed password
        const match = await bcrpty.compare(password, seller.password);

        if (match) {
          // Generate JWT with seller ID and role
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });

          // Set token in cookie, valid for 7 days
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });

          // Send success response
          responseReturn(res, 200, { token, message: "Login success" });
        } else {
          // Password mismatch
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        // Admin not found
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      // Log and return server error
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End of seller_login method

  /**
   * Get current user info (based on token)
   *
   * This function checks the role from the request (decoded JWT),
   * and fetches the appropriate user model (admin/seller).
   *
   * @param {import('express').Request & { id: string, role: string }} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  get_user = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        // Find admin user by ID
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        // Find seller user by ID
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      // Handle error
      return responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of get_user method
}

// Export instance of authControllers for use in routes
module.exports = new authControllers();
