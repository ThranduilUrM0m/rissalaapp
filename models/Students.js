const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({
    _registration_number: String,
    _first_name: String,
    _last_name: String,
    _classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    },
    _gender: {
        type: String, 
        enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
    },
    _dateofbirth: Date,
    _registration_date: Date,
    _attendance: [{
        _date: Date,
        _status: Boolean,
        _checked_at: Date,
    }],
    _first_parent: {
        _full_name_first_parent: String,
        _gender_first_parent: {
            type: String, 
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
        },
        _adresse_first_parent: String,
        _phone_first_parent: String,
    },
    _second_parent: {
        _full_name_second_parent: String,
        _gender_second_parent: {
            type: String, 
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
        },
        _adresse_second_parent: String,
        _phone_second_parent: String,
    },
    _guardian: {
        _full_name_guardian: String,
        _gender_guardian: {
            type: String, 
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
        },
        _adresse_guardian: String,
        _phone_guardian: String,
    },
}, { timestamps: true });
StudentsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _registration_number: this._registration_number,
        _first_name: this._first_name,
        _last_name: this._last_name,
        _classroom: this._classroom,
        _gender: this._gender,
        _dateofbirth: this._dateofbirth,
        _registration_date: this._registration_date,

        _attendance: this._attendance,
        _first_parent: this._first_parent,
        _second_parent: this._second_parent,
        _guardian: this._guardian,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Students', StudentsSchema);