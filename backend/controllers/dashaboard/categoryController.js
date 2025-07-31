// Import the formidable library for handling form data
const { IncomingForm } = require("formidable");
const { responseReturn } = require("../../utils/responseReturn");

// Define the categoryController class to handle category-related logic
class categoryController {
  add_Category = async (req, res) => {
    // Create a new formidable form instance
    const form = new IncomingForm();
    // Parse the incoming form data
    form.parse(req, async (err, fields, files) => {
      // console.log(fields);
      // console.log(files);
      if (err) {
        // Handle any parsing errors
        responseReturn(res, 404, { error: "something went wrong" });
      } else {
        // If parsing is successful, extract the name field from the parsed data
        let { name } = fields;
        // Extract the image file from the parsed files
        let { image } = files;
        name = name.trim(); // Trim whitespace from the name
        const slug = name.split(" ").join("-"); // Create a slug by replacing spaces with hyphens
      }
    });
  };
  // End of add_Category method

  get_Category = async (req, res) => {
    console.log("this is getting");
  };
  // End of get_Category method
}

// Export instance of categoryController for use in routes
module.exports = new categoryController();
