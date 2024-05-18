'use strict'

const { connectToRabbitMQForTest } = require('../dbs/init.rabbit');

describe('RabbitMQ connection', () => {
    it('should connect to successful rabbitMQ', async () => {
        const result = await connectToRabbitMQForTest()
        expect(result).toBeUndefined();
    })
})