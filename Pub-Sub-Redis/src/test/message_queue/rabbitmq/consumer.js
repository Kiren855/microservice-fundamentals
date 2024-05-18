const amqp = require('amqplib');

const runConsumer = async () => {
    try {
        const connection = await amqp.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();

        const queueName = "test-topic";
        await channel.assertQueue(queueName, {
            durable: true
        });

        channel.consume(queueName, message => {
            console.log(`received: ${message.content.toString()}`)
        }, {
            noAck: true
        });
    } catch (error) {
        console.error(error);
    }
}

runConsumer().catch(console.error);