// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true, // Reference to the product being advertised in the banner
    },

    banner: {
      type: String,
      required: true, // URL or path to the banner image
    },

    link: {
      type: String,
      required: true, // Link associated with the banner (e.g., product page URL)
    },
  },
  { timestamps: true }
); // Enable timestamps to automatically add createdAt and updatedAt fields

module.exports = model("banners", bannerSchema);
