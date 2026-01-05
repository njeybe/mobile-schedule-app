import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    time:{
        type: Date,
        required: true
    },
    type:{
        type: String,
        enum: ['medication', 'task'],
        default: 'task'
    }
},{
    timestamps: true
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

export default Schedule;