class ChatController {
  async add_customer_friend(req, res) {
    const { sellerId, userId } = req.body;
    console.log(req.body);
  }
  // End of add_customer_friend method
}

module.exports = new ChatController();
