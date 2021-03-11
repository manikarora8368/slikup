const mongoose = require('mongoose');

const ResetPassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const ResetPass = mongoose.model('ResetPass',ResetPassSchema);
module.exports = ResetPass;