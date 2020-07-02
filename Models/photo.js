const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    file: {
        type: Buffer,
        required: true
    },

    fileImageType: {
        type: String,
        required: true
    }

} ,{timestamps: true})

photoSchema.virtual('imagePath').get(function() {
    if (this.file != null && this.fileImageType != null) {
        return `data:${this.fileImageType};charset=utf-8;base64, ${this.file.toString('base64')}`
    }
})

module.exports =  mongoose.model('photo' , photoSchema);