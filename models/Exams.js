const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamsSchema = new Schema({
    _date: Date,
    _type: String,
    _course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    _student: {
        _student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        _content: [{
            _question: String,
            _correct_answer: String,
            _student_answer: String,
        }],
    },
}, { timestamps: true });
ExamsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _date: this._date,
        _type: this._type,
        _course: this._course,
        _student: this._student,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Exams', ExamsSchema);