const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassroomsSchema = new Schema({
    _code: String,
    _name: String,
    _grade: String,
    _section: String,
    _school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    _teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    _subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    _students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, { timestamps: true });
ClassroomsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _code: this._code,
        _name: this._name,
        _grade: this._grade,
        _section: this._section,
        _school: this._school,
        _teacher: this._teacher,
        _subjects: this._subjects,
        _students: this._students,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Classrooms', ClassroomsSchema);