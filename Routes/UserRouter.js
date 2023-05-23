const express = require('express');
const route = express.Router();
const UserCont = require('../Controllers/UserController');
const EditProfileMw = require('../MiddlewWares/EditProfileMw');
const CheckBeforeChangeMW = require('../MiddlewWares/CheckBeforeChangeMW');
const AuthMw = require('../MiddlewWares/AuthMw');

// route.use(AuthMw)

// Get User By Id
route.get('/:id', AuthMw, UserCont.getUser);
// find user by username
route.get('/search/:userName', AuthMw, UserCont.search);
// Edit User Password
route.patch('/:id/editPass', AuthMw, UserCont.forgetPass);
// Edit User Data (Complete Data..)
route.put('/:id/editProfile', AuthMw, CheckBeforeChangeMW, EditProfileMw, UserCont.completeProfile);
// delete Own User
route.delete('/:id/erase', AuthMw, CheckBeforeChangeMW, UserCont.deleteProfile);
// Folllow User
route.post('/:id/follow', AuthMw, UserCont.follow);
// UnFollow User
route.post('/:id/unfollow', AuthMw, UserCont.unFollow);
// Get Following
route.get('/:id/getFollowing', AuthMw, UserCont.getFollowing);
// Get Followers
route.get('/:id/getFollowers', AuthMw, UserCont.getFollowers);


module.exports = route;