const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        // check newUser Exists Or Not
        let newUser = await User.findOne({ email: req.body.email }).exec();
        if (newUser) return res.status(400).json("failed to register ..email already exists");
        // create hash password
        let hashedPass = await bcrypt.hash(req.body.password, 10);
        // Saving New User
        newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPass,
            phoneNumber: req.body.phoneNumber
        });
        // Difining The Token
        const token = newUser.generateToken();
        if (!token) return res.status(500).json("Token Error");
        await newUser.save();
        res.header('x-auth-token', token);
        newUser.verifiedUser = true;
        res.status(201).json({
            accessToken: token,
            message: "User Added Succesfully",
            user: newUser
        });

    } catch (error) {
        res.status(500).json('enternal server Error failed to register');
        console.log(error.message)
    }

}

const signin = async (req, res) => {

    // check email and password correct or not
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(403).json("invalid email or password");
    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass) return res.status(403).json("invalid email or password");

    // generate token and send response
    const token = user.generateToken();
    if (!token) return res.status(500).json("Token Error");
    res.header('auth-token', token);
    res.status(200).json({
        message: "logged in ..",
        accessToken: token,
        user: user
    });
}

module.exports = { signup, signin }