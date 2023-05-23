const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');

// Get One User 
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select({ password: 0, _id: 0 });
        res.json({ user: user });
    } catch (error) {
        res.status(500).json("Internal Server Error");
        console.log(error.message);
    };
};
// Search for Users..
const search = async (req, res) => {
    try {
        const searchResults = await User.
            find({ userName: { $regex: req.params.userName } })
            .select({
                _id: 0,
                firstName: 1,
                lastName: 1,
                userName: 1,
                avatar: 1
            });
        if (searchResults.length < 1) return res.status(404).json("Matches Not Found..");
        res.json({
            users: searchResults
        });
    } catch (error) {
        res.status(500).json("Internal Server Error");
        console.log(error.message);
    };
};
// Edit Or Forget Password
const forgetPass = async (req, res) => {
    try {
        // check length of password is higher than or equal 8
        if (req.body.password.length < 8) return res.status(400).json("password must be at least 8 char");
        // get user password and make sure the new password is not the same
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json("User Not Found");
        const newPass = await bcrypt.compare(req.body.password, user.password);
        if (newPass) return res.status(400).json('Same Password Try To Change ..');
        // update password and save the new one
        user.password = await bcrypt.hash(req.body.password, 10);
        await user.save();
        // send res
        res.json({ message: "Password Changed Successfully..", });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};
// Complete Or Edit Profile
const completeProfile = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        // send res 
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal Server Error");
    };
};
// Delete Account
const deleteProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json("User Deleted Successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};

// Follow Account
const follow = async (req, res) => {
    try {
        // Check The Regular Bad Request It May Happen
        if (req.params.id === req.user._id) return res.status(403).json("Bad Request Cannot Follow Your Self");
        if (req.user.following.includes(req.params.id)) return res.status(403).json("Bad Request You Already Follow This User");
        // Update The Followers List Of The User You Want To Follow
        const newUser = await User.findByIdAndUpdate(req.params.id,
            { $push: { followers: req.user._id } },
            { new: true });
        // Check If User Exist
        if (!newUser) return res.status(404).json('User Not Found');
        // Update The Following List Of Your Account
        await User.findByIdAndUpdate(req.user._id,
            { $push: { following: req.params.id } },
            { new: true });
        // Send Response
        res.json({
            message: "Following"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
};
// Unfollow Account
const unFollow = async (req, res) => {
    try {
        // Check The Regular Bad Request It May Happen
        if (req.params.id === req.user._id) return res.status(403).json("Bad Request Cannot UnFollow Your Self");
        // Update The Followers List Of The User You Want To Follow
        if (req.user.following.includes(req.params.id)) {
            const newUser = await User.findByIdAndUpdate(req.params.id,
                { $pull: { followers: req.user._id } },
                { new: true });
            if (!newUser) return res.status(404).json('User Not Found');
            // Update The Following List Of Your Account
            await User.findByIdAndUpdate(req.user._id,
                { $pull: { following: req.params.id } },
                { new: true });
            // Send Response
            res.json({
                message: "Follow"
            });
            // Send The Bad Request If Prev Condition False 
        } else return res.status(403).json("Bad Request You Already Have No Longer Relation With This User");

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};
const getFollowing = async (req, res) => {
    try {

        const followingList = await User.find({ _id: req.params.id })
            .populate({
                path: 'following',
                select: { firstName: 1, lastName: 1, userName: 1, avatar: 1, _id: 0 }
            });
        if (!followingList) return res.status(403).json("failed to get following list")
        res.json({ following: followingList[0].following });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};
const getFollowers = async (req, res) => {
    try {
        const followersList = await User.find({ _id: req.params.id }).populate({
            path: 'followers',
            select: { firstName: 1, lastName: 1, userName: 1, avatar: 1, _id: 0 }
        })
        res.json({ followers: followersList[0].followers });
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    };
};

module.exports = {
    getUser,
    search,
    forgetPass,
    completeProfile,
    deleteProfile,
    follow,
    unFollow,
    getFollowing,
    getFollowers
};