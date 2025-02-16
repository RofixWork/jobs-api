import {Model, model, Schema} from 'mongoose';

const JobSchema = new Schema({
    company: {
        type: Schema.Types.String,
        required: [true, 'please provide company name...'],
        trim: true,
        maxlength: 50,
        minlength: [3, "Must be at least 3, got {VALUE}"],
        lowercase: true
    },
    position: {
        type: Schema.Types.String,
        required: [true, 'please provide position...'],
        trim: true,
        maxlength: 100,
        minlength: [3, "Must be at least 3, got {VALUE}"],
        lowercase: true
    },
    status: {
        type: Schema.Types.String,
        enum: {
            values: ['pending', 'interview', 'declined'],
            message: 'Status must be either pending, interview, or declined.'
        },
        default: 'pending'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: [true, 'please provide user']
    }
}, {timestamps: true})

/**
 * @type {Model}
 */
const Job = model('Job', JobSchema);

export default Job;