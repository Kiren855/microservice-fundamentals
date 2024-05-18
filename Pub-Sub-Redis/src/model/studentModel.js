'use strict'
const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Student'
const COLLECTION_NAME = 'Students'

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 150
    },
    msv: {
        type: Number,
        unique: true
    },
    gender: {
        type: String,
        default: 'unknown'
    },
    phone: {
        type: Number,
    },
    CPA: {
        type: Number,
        default: 0.0,
        max: 4.0,
        min: 0.0
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, studentSchema);