import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    name: String,
    creator: String,
    isAdminPost: Boolean,
    tags: [String],
    selectedFile: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    isGraded: {
        type: Boolean,
        default: false
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
