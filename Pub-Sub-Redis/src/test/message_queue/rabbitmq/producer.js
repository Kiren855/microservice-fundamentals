const amqp = require('amqplib');
const message = "using rabbitMQ v2";

const runProducer = async () => {
    try {
        const connection = await amqp.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();

        const queueName = "test-topic";
        await channel.assertQueue(queueName, {
            durable: true
        });

        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`message sent: ${message}`);
    } catch (error) {
        console.error(error);
    }
}

runProducer().catch(console.error);