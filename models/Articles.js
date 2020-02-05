const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticlesSchema = new Schema({
  title: String,
  body: String,
  author: String,
  tag: [String],
  comment: [{
    author: String,
    body: String,
    date: Date,
    upvotes: [{
      upvoter: String,
    }],
    downvotes: [{
      downvoter: String,
    }],
  }],
  upvotes: [{
    upvoter: String,
  }],
  downvotes: [{
    downvoter: String,
  }],
  view: [{
    viewer: String,
    _yes_or_no: Boolean,
  }],
}, { timestamps: true });

ArticlesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    tag: this.tag,
    comment: this.comment,
    upvotes: this.upvotes,
    downvotes: this.downvotes,
    view: this.view,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Articles', ArticlesSchema);