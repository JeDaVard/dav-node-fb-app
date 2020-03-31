const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false },
    answer: { type: String, default: '' }
});

module.exports = RecipientSchema;