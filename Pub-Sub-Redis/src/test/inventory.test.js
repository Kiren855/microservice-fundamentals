// InventoryService.js
const RedisPubSubService = require('../service/RedisPubSubService');

class InventoryService {
    constructor() {
        RedisPubSubService.subscribe('purchase_events', (message) => {
            console.log(message);
            const order = JSON.parse(message);
            InventoryService.updateInventory(order.productId, order.quantity);
        })
    }
    static updateInventory(productId, quantity) {
        console.log(`update inventory ${productId} with quantity ${quantity}`);
    }
}

module.exports = new InventoryService();
