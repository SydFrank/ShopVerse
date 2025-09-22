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

    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        const tempCusPro = pro[j].productInfo;
        tempCusPro.quantity = pro[j].quantity;
        customerOrderProduct.push(tempCusPro);
        if (pro[j]._id) {
          cartId.push(pro[j]._id);
        }
      }
    }
    console.log(customerOrderProduct);
    console.log(cartId);
  }
  // End method of place_order
}

module.exports = new orderControllers();
