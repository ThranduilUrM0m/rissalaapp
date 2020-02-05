const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchoolsSchema = new Schema({
    _name: String,
    _address: String,
    _principal_name: String,
}, { timestamps: true });

SchoolsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _name: this._name,
        _address: this._address,
        _principal_name: this._principal_name,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

mongoose.model('Schools', SchoolsSchema);