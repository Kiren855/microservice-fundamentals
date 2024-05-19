const mongoose = require('mongoose');
const { db } = require('../config/dbConfig');

const conSTR = `mongodb://${db.host}:${db.port}/${db.name}`;

console.log(conSTR);
const testSchema = new mongoose.Schema({
    name: String
});
const test = mongoose.model('Test', testSchema);

describe('Mongoose Connection', () => {
    let connection;
    beforeAll(async () => {
        connection = await mongoose.connect(conSTR);
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    it('should connect to mongodb', () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('should save document to the database', async () => {
        const user = new test({ name: "testing" });
        await user.save();
        expect(user.isNew).toBe(false);
    })

    it('should find document from the database', async () => {
        const user = await test.findOne({ name: 'testing' })
        expect(user).toBeDefined();
        expect(user.name).toBe('testing');
    })
})