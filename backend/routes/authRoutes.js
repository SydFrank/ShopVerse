// Import the authentication controller module
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/admin-login' that uses the admin_login method from authControllers
router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.get_user);
router.post("/seller-register", authControllers.seller_register);
router.post("/seller-login", authControllers.seller_login);
router.post(
  "/profile-image-upload",
  authMiddleware,
  authControllers.profile_image_upload,
);
router.post(
  "/profile-info-add",
  authMiddleware,
  authControllers.profile_info_add,
);

router.get("/logout", authMiddleware, authControllers.logout);

router.post(
  "/change-password",
  authMiddleware,
  authControllers.change_password,
);

// Export the router to be used in the main server application
module.exports = router;
