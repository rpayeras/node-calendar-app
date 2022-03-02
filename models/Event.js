const {Schema, model} = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        require: true,
    },
    endDate: {
        type: String,
        require: true,
    },
    bgcolor: {
        type: String,
        require: false,
    },
    notes: {
        type: String,
        require: false,
    },
    user: {
        type: Object,
        require: false
    }
})

module.exports = model('Event', EventSchema)