const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const bcrpty = require("bcrypt");
const { createToken } = require("../utils/tokenCreate");
// Import the formidable library for handling form data (multipart/form-data, file uploads)
const formidable = require("formidable");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../utils/response");
// Import the cloudinary library for image uploading and management
const cloudinary = require("cloudinary").v2;

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

  /**
   * Handles uploading and updating the seller's profile image.
   * Expects a multipart/form-data request containing the new profile image.
   * The method uploads the image to Cloudinary, updates the seller's profile image URL in the database,
   * and returns the updated user info in the response.
   *
   * @param {Object} req - Express request object, expects:
   *   - id: seller's ID (attached to req)
   *   - form-data files: image (profile image file)
   * @param {Object} res - Express response object
   */
  profile_image_upload = async (req, res) => {
    // Extract the seller's ID from the request (assumed to be attached by authentication middleware)
    const { id } = req;
    // Use formidable to handle file uploads (supports multiple files, but only one is expected here)
    const form = formidable({ multiples: true });
    // Parse the incoming form data (fields and files)
    form.parse(req, async (err, _, files) => {
      // Configure Cloudinary with credentials from environment variables
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });
      // Extract the uploaded image file from the parsed files
      const { image } = files;
      try {
        // Upload the new image file to Cloudinary under the 'profile' folder
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "profile",
        });
        if (result) {
          // Update the seller's profile image URL in the database
          await sellerModel.findByIdAndUpdate(id, {
            image: result.url, // Save the new image URL
          });
          // Retrieve the updated seller info from the database
          const userInfo = await sellerModel.findById(id);
          // Return success response with updated user info
          return responseReturn(res, 201, {
            message: "Profile Image Uploaded Successfully",
            userInfo,
          });
        } else {
          // Handle case where image upload fails
          return responseReturn(res, 404, { error: "Image Upload Failed" });
        }
      } catch (error) {
        // Handle upload error and return a 500 error response
        return responseReturn(res, 500, { error: error.message });
      }
    });
  };
  // End of profile_image_upload

  /**
   * Handles adding or updating the seller's shop profile information.
   * Expects a JSON request containing shop details such as division, district, shop name, and sub-district.
   * The method updates the seller's shopInfo field in the database and returns the updated user info.
   *
   * @param {Object} req - Express request object, expects:
   *   - id: seller's ID (attached to req)
   *   - body: contains division, district, shopName, sub_district
   * @param {Object} res - Express response object
   */
  profile_info_add = async (req, res) => {
    // Optionally log the request body for debugging
    // console.log(req.body);

    // Extract the seller's ID from the request (assumed to be attached by authentication middleware)
    const { id } = req;
    // Extract shop profile fields from the request body
    const { division, district, shopName, sub_district } = req.body;

    try {
      // Update the seller's shopInfo field in the database with the new profile information
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          division, // Seller's division
          district, // Seller's district
          sub_district, // Seller's sub-district
          shopName, // Seller's shop name
        },
      });
      // Retrieve the updated seller info from the database
      const userInfo = await sellerModel.findById(id);
      // Return success response with updated user info
      return responseReturn(res, 201, {
        message: "Profile Info Added Successfully",
        userInfo,
      });
    } catch (error) {
      // Return a 500 error response if any error occurs during update
      return responseReturn(res, 500, { error: error.message });
    }
  };
  // End of profile_info_add
}

// Export instance of authControllers for use in routes
module.exports = new authControllers();
