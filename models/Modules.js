const mongoose = require('mongoose');

const { Schema } = mongoose;

const ModulesSchema = new Schema({
    _name: String,
    _sessions: [{
      _period_in_minutes: Number,
    }],
    _subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subjects'
    }
}, { timestamps: true });

ModulesSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _name: this._name,
        _sessions: this._sessions,
        _subject: this._subject,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
  
mongoose.model('Modules', ModulesSchema);