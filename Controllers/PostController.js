const Post = require('../Models/PostModel');

// Get All Posts
const getPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({ userId: [...req.user.following, req.user._id] })
            .sort({ createdAt: -1 })
            .populate({
                path: "userId",
                select: { firstName: 1, lastName: 1, _id: 0, avatar: 1, userName: 1 }
            });
        if (!allPosts) return res.status(403).json("w rbna ma hd fahm haga 5alss");
        res.json({
            allPosts: allPosts
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};
// Get Post By Id
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: "userId",
            select: { firstName: 1, lastName: 1, _id: 0, avatar: 1, userName: 1 }
        });
        if (!post) return res.status(404).json("This Post Not Exist..");
        res.json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};
// Get User Posts

const getUserPosts = async (req, res) => {
    try {
        const userPosts = await Post.find({ userId: req.params.id })
            // .sort({ createdAt: -1 })
            .populate({
                path: "userId",
                select: { firstName: 1, lastName: 1, _id: 0, avatar: 1, userName: 1 }
            });
        if (!userPosts) return res.status(404).json("User Not Found");
        res.json({
            userPosts
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
}
// Create Post
const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            content: req.body.content,
            userId: req.user._id
        });
        await newPost.save();
        res.status(201).json({
            message: "Post Added Successfully",
            newPost: newPost
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};

module.exports = {
    getPosts,
    getPostById,
    getUserPosts,
    createPost
};