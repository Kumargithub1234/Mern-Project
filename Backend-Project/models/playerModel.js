const mongoose = require('mongoose')

const Player = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model('Player', Player)