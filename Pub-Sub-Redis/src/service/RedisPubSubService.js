// RedisPubSubService.js
const Redis = require('redis');
class RedisPubSubService {
    constructor() {
        this.publisher = Redis.createClient();
        this.subscriber = Redis.createClient();
        // this.publisher = new Redis({
        //     port: 11178, // Redis port
        //     host: "redis-11178.c299.asia-northeast1-1.gce.redns.redis-cloud.com", // Redis host
        //     username: "default", // needs Redis >= 6
        //     password: "r6pGi858ni4depGfqjAqkIYmIBBCslJk",
        //     db: 0, // Defaults to 0
        // });
        // this.subscriber = new Redis({
        //     port: 11178, // Redis port
        //     host: "redis-11178.c299.asia-northeast1-1.gce.redns.redis-cloud.com", // Redis host
        //     username: "default", // needs Redis >= 6
        //     password: "r6pGi858ni4depGfqjAqkIYmIBBCslJk",
        //     db: 0, // Defaults to 0
        // });
    }

    publish(channel, message) {
        return new Promise((resolve, reject) => {
            this.publisher.publish(channel, message, (err, reply) => {
                if (err)
                    reject(err);
                else
                    resolve(reply);
            });
        });
    }

    subscribe(channel, callback) {
        this.subscriber.on('ready', () => {
            console.log('Redis subscriber is ready.');
            // Sau khi Redis sẵn sàng, subscribe vào channel
            this.subscriber.subscribe(channel);
            console.log(`Subscribing to channel: ${channel}`);

            // Truyền biến channel vào trong hàm callback của sự kiện 'message'
            this.subscriber.on('message', (subscriberChannel, message) => {
                console.log('ok');
                if (channel === subscriberChannel) {
                    console.log(`Received message on channel ${channel}: ${message}`);
                    callback(message);
                }
            });
        });
    }

}

module.exports = new RedisPubSubService();
