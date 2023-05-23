const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

const Post = mongoose.model("Post",postSchema);
module.exports = Post;