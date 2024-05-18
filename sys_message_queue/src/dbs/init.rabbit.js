'use strict'

const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://127.0.0.1');
        if (!connection) throw new Error('Connect error');

        const channel = await connection.createChannel();
        return { channel, connection }
    } catch (error) {
        throw error;
    }
}

const connectToRabbitMQForTest = async () => {
    try {
        const { channel, connection } = await connectToRabbitMQ();
        const queue = "test-topic";
        const message = "hello, testing rabbit message";

        await channel.assertQueue(queue);
        await channel.sendToQueue(message, Buffer.from(message));

        await connection.close();
    } catch (error) {
        console.error(`error connect rabbitMQ `, error);
    }
}
module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQForTest
}