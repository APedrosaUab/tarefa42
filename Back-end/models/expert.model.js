// No modelo expert.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema({
    name: String,
    animal: String,
    group: String,
    years_experience: Number,
    description: String,
    location: {
        city: String,
        country: String
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);
