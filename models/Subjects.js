const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubjectsSchema = new Schema({
    _name: String,
    _classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    },
}, { timestamps: true });
SubjectsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _name: this._name,
        _classroom: this._classroom,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Subjects', SubjectsSchema);