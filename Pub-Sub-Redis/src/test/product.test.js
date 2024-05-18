// ProductServiceTest.js
const RedisPubSubService = require('../service/RedisPubSubService');

class ProductServiceTest {
    purchaseProduct(productId, quantity) {
        const order = {
            productId,
            quantity
        }
        console.log(order);
        RedisPubSubService.publish('purchase_events', JSON.stringify(order));
    }
}

module.exports = new ProductServiceTest();
