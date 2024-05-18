const studentModel = require('../model/studentModel');

class StudentFactory {
    static async createStudent(payload) {
        return new Student(payload).createStudent();
    }

    static async findAll({ limit = 15, skip = 0 }) {

        return await studentModel.find()
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();
    }

    static async updateStudent(student_id, payload) {
        return new Student(payload).updateStudent(student_id);
    }

    static async removeStudent(student_id) {
        return new Student({}).deleteStudent(student_id);
    }

}

class Student {
    constructor({ name, msv, gender, phone, CPA }) {
        this.name = name;
        this.msv = msv;
        this.gender = gender;
        this.phone = phone;
        this.CPA = CPA;
    }

    async findStudent(student_id) {
        return await studentModel.findById(student_id);
    }
    async createStudent() {
        return await studentModel.create(this);
    }

    async updateStudent(student_id, payload) {
        return await studentModel.findByIdAndUpdate(student_id, this, {
            new: true
        })
    }
    async deleteStudent(student_id) {
        return await studentModel.findByIdAndDelete(student_id);
    }
}

module.exports = StudentFactory;