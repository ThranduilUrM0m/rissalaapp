const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomeworksSchema = new Schema({
    _due_date: Date,
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
HomeworksSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _due_date: this._due_date,
        _course: this._course,
        _student: this._student,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Homeworks', HomeworksSchema);