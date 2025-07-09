// Define the authControllers class to handle authentication-related logic
class authControllers {
  // Asynchronous method to handle admin login requests
  // Logs the request body to the console (for debugging or further processing)
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
    } catch (error) {}
  };
}

// Export an instance of the authControllers class for use in routing
module.exports = new authControllers();
