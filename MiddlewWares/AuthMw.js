const jwt = require("jsonwebtoken");
const User = require('../Models/UserModel');
// require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if(!token) return res.status(402).json({message: "No token, authorization denied"})

        const {userid} = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!userid) return res.status(403).json({message: "Invalid Authentication."})

        const user = await User.findOne({_id: userid})
        
        req.user = user
        if(!user) return res.status(400).json("error Occured..");
        // console.log(user)
        
        next()
        // if (!verifiedToken) return res.status(401).json('ACCESS DENIED..');
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            err: error
        });

    }

};