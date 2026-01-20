// Import the authentication controller module
const categoryController = require("../../controllers/dashboard/categoryController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/category-add' that uses the add_Category method from categoryController
router.post("/category-add", authMiddleware, categoryController.add_Category);

// Define a GET route at '/category-get' that uses the get_Category method from categoryController
router.get("/category-get", authMiddleware, categoryController.get_Category);

router.put(
  "/category-update/:id",
  authMiddleware,
  categoryController.update_Category,
);
// Export the router to be used in the main server application
module.exports = router;
