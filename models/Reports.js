const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportsSchema = new Schema({
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
            _student_answer: String,
        }],
    },
}, { timestamps: true });
ReportsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _due_date: this._due_date,
        _course: this._course,
        _student: this._student,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Reports', ReportsSchema);