'use strict'

const studentService = require("../service/studentService");
const { OK, SuccessResponse, Create } = require('../core/successResponse');

const { createClient } = require('redis');

const Redis = require('ioredis');


// const client = createClient({
//     password: 'r6pGi858ni4depGfqjAqkIYmIBBCslJk',
//     socket: {
//         host: 'redis-11178.c299.asia-northeast1-1.gce.redns.redis-cloud.com',
//         port: 11178
//     }
// });

const client = new Redis({
    port: 11178, // Redis port
    host: "redis-11178.c299.asia-northeast1-1.gce.redns.redis-cloud.com", // Redis host
    username: "default", // needs Redis >= 6
    password: "r6pGi858ni4depGfqjAqkIYmIBBCslJk",
    db: 0, // Defaults to 0
});

client.on("error", function (error) {
    console.error(error);
});

class StudentController {
    getAllStudent = async (req, res, next) => {
        const cacheKey = 'students';

        client.get(cacheKey, async (err, cachedData) => {
            if (err) throw err;

            if (cachedData) {
                new SuccessResponse({
                    message: 'get all success',
                    metadata: JSON.parse(cachedData)
                }).send(res);

            } else {
                const students = await studentService.findAll({ limit: req.query.limit, skip: req.query.skip });
                client.setex(cacheKey, 3600, JSON.stringify(students));

                new SuccessResponse({
                    message: 'get all success',
                    metadata: students
                }).send(res);
            }
        });

    }

    createStudent = async (req, res, next) => {

        const newStudent = await studentService.createStudent({ ...req.body });

        const cacheKey = 'students';
        client.del(cacheKey, (err, response) => {
            if (err) throw err;
        });

        new SuccessResponse({
            message: 'create ok',
            metadata: newStudent
        }).send(res);
    };

    updateStudent = async (req, res, next) => {
        const cacheKey = 'students';
        client.del(cacheKey, (err, response) => {
            if (err) throw err;
        });

        new SuccessResponse({
            message: 'update success',
            metadata: await studentService.updateStudent(req.params.studentId, req.body)
        }).send(res);
    }

    removeStudent = async (req, res, next) => {

        const cacheKey = 'students';
        client.del(cacheKey, (err, response) => {
            if (err) throw err;
        });


        new SuccessResponse({
            message: 'remove success',
            metadata: await studentService.removeStudent(req.params.studentId)
        }).send(res);
    }

}

module.exports = new StudentController();