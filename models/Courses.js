const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoursesSchema = new Schema({
    _name: String,
    _abilities_inview: [{
        _name: String,
    }],
    _sessions: [{
        _name: String,
        _rang: Number,
        _date: Date,
        _activities: [{
            _name: String,
            _content: String,
            _description: String,
        }],
    }],
    _subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
}, { timestamps: true });
CoursesSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _name: this._name,
        _abilities_inview: this._abilities_inview,
        _sessions: this._sessions,
        _subject: this._subject,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Courses', CoursesSchema);