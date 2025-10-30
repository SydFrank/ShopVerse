// Import the customer model for database operations
const customerModel = require("../../models/customerModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
// Import bcrypt library for password hashing
const bcrypt = require("bcrypt");
// Import seller-customer chat model for establishing chat relationships
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
// Import token creation utility for authentication
const { createToken } = require("../../utils/tokenCreate");

// Define the customerAuthControllers class to handle customer authentication logic
class customerAuthControllers {
  /**
   * Handles customer registration.
   * This method creates a new customer account with the provided information,
   * hashes the password for security, creates a chat relationship entry,
   * generates an authentication token, and sets a cookie for session management.
   *
   * @param {Object} req - Express request object, expects body:
   *   - name: customer's full name (string)
   *   - email: customer's email address (string)
   *   - password: customer's plain text password (string)
   * @param {Object} res - Express response object
   */
  customer_register = async (req, res) => {
    // Extract registration fields from the request body
    const { name, email, password } = req.body;

    try {
      // Check if a customer with this email already exists in the database
      const customer = await customerModel.findOne({ email });
      if (customer) {
        // Return error response if email is already registered
        responseReturn(res, 404, { error: "Email Already Exists" });
      } else {
        // Create a new customer account in the database
        const createCustomer = await customerModel.create({
          name: name.trim(), // Trim whitespace from name
          email: email.trim(), // Trim whitespace from email
          password: await bcrypt.hash(password, 10), // Hash password with salt rounds of 10
          method: "manually", // Registration method (manual vs social login)
        });

        // Create a seller-customer chat relationship entry for this new customer
        await sellerCustomerModel.create({
          myId: createCustomer.id, // Store customer's ID for chat purposes
        });

        // Generate JWT token with customer information for authentication
        const token = await createToken({
          id: createCustomer.id, // Customer's unique ID
          name: createCustomer.name, // Customer's name
          email: createCustomer.email, // Customer's email
          method: createCustomer.method, // Registration method
        });

        // Set authentication token as HTTP cookie with 7-day expiration
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
        });

        // Return success response with token
        responseReturn(res, 201, {
          message: "User Registered Successfully",
          token, // Include token in response for client-side storage
        });
      }
    } catch (error) {
      // Log error message to console for debugging purposes
      // console.log(error.message);
      // Return internal server error response
      responseReturn(res, 500, "Internal server error");
    }
  };
  // End of customer_register method

  /**
   * Handles customer login authentication.
   * This method validates customer credentials, compares the provided password
   * with the stored hashed password, generates an authentication token,
   * and sets a cookie for session management upon successful login.
   *
   * @param {Object} req - Express request object, expects body:
   *   - email: customer's email address (string)
   *   - password: customer's plain text password (string)
   * @param {Object} res - Express response object
   */
  customer_login = async (req, res) => {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    try {
      // Find customer by email and include the password field (normally excluded)
      const customer = await customerModel
        .findOne({ email })
        .select("+password"); // Include password field for comparison

      if (customer) {
        // Compare provided password with stored hashed password
        const match = await bcrypt.compare(password, customer.password);

        if (match) {
          // Generate JWT token with customer information for authentication
          const token = await createToken({
            id: customer.id, // Customer's unique ID
            name: customer.name, // Customer's name
            email: customer.email, // Customer's email
            method: customer.method, // Registration method
          });

          // Set authentication token as HTTP cookie with 7-day expiration
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Cookie expires in 7 days
          });

          // Return success response with token
          responseReturn(res, 201, {
            message: "User Login Successfully",
            token, // Include token in response for client-side storage
          });
        } else {
          // Return error response if password doesn't match
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        // Return error response if email is not found in database
        responseReturn(res, 404, { error: "Email Not Found" });
      }
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
      // Return internal server error response
      responseReturn(res, 500, "Internal Server Error");
    }
  };
  // End of customer_login method

  /**
   * Handles customer logout.
   * This method clears the authentication token cookie to log the customer out.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  customer_logout = async (req, res) => {
    res.cookie("customerToken", "", {
      expires: new Date(Date.now()), // Expire the cookie immediately
    });
    responseReturn(res, 200, { message: "Logged Out Successfully" });
  };
  // End of customer_logout method
}

// Export instance of customerAuthControllers for use in routes
module.exports = new customerAuthControllers();
