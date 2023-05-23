const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    try {
        // check if user exist
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json("user not found");
        // compare passwords
        const correctPassword = await bcrypt.compare(req.body.yourPassword, user.password);
        if (!correctPassword) return res.status(400).json('Wrong Password..');
        next();
    } catch (err) {
        console.log(err.message);
        res.status(400).json("User Check Error")
    }
}