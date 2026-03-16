const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a skill name'],
        unique: true,
        trim: true
    },
    level: {
        type: String,
        required: [true, 'Please add a proficiency level'],
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
    },
    icon: {
        type: String,
        required: [true, 'Please add an icon class or URL']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
