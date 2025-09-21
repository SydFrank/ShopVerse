const moment = require("moment");
const authOrderModel = require("../../models/authOrder");
const customerOrderModel = require("../../models/customerOrder");

class orderControllers {
  place_order(req, res) {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;

    let authorOrderData = [];
    let cartId = [];

    const tempData = moment(Date.now()).format("LLL");

    let customerOrderProduct = [];
  }
  // End method of place_order
}

module.exports = new orderControllers();
