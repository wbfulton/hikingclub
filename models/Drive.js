const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriveSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'user'
    },
    leavingDate: {
        type: Date,
        required: true,
    },
    leavingTime: {
        type: String,
        required: true,
    },
    resort: {
        type : String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    seats: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    group : [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            name : {
                type: String
            },
            avatar : {
                type: String
            },
            grade : {
                type: String
            },
            type : {
                type: String
            },
            skills : {
                type: [String]
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments : [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = drive = mongoose.model('drive', DriveSchema);