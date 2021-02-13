const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} =  require('express-validator')
const normalize = require('normalize-url');
const request = require("request");
const Profile = require('../../models/Profile');
const config = require("config");
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})
                                     .populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({
                msg: 'There is no profile for this user'
            })
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(), 
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{
        company, 
        website, 
        location, 
        bio, 
        status, 
        githubusername, 
        skills,
        youtube,
        facebook, 
        twitter, 
        instagram, 
        linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill=>skill.trim());
    }
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;
    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            // Update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
            return res.json(profile)
        }
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send("Server Error");
    }
})


// @route   DELETE api/profile
// @desc    Delete profile, user, posts
// @access  Private
router.delete("/", auth, async (req, res)=>{
    try {
        // Remove Profile
        await Profile.findOneAndRemove({user: req.user.id})
        // Remove User
        await User.findOneAndRemove({_id: req.user.id})
        res.json({msg: 'User Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {title, company, location, from, to, current, description} = req.body;
    const newExp = {
        title, 
        company, 
        location, 
        from, 
        to, 
        current, 
        description
    }
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save()
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id});
        // Get remove index
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');    
    }
})


// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {school, degree, fieldofstudy, from, to, current, description} = req.body;
    const newEdu = {
        school, 
        degree, 
        fieldofstudy, 
        from, 
        to, 
        current, 
        description
    }
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu);
        await profile.save()
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id});
        // Get remove index
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');    
    }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", (req, res)=>{
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("githubClientId")}&client_secret=${config.get("githubSecret")}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body)=>{
            if(error) console.log(error);
            if(response.statusCode !== 200){
                return res.status(404).json({msg: 'Github Profile not found'})
            }
            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');    
    }
})

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// @route   GET api/profile/:code
// @desc    Get profiles of a particular team
// @access  Private
router.get("/:code", auth, async (req, res)=>{
    try {
        const users = await User.find();
        const userIds = [];
        users.map(user=>{
            const curTeam = user.teams.filter(team=>{
                return team.code === req.params.code
            })
            if(curTeam.length>0){
                userIds.push(user._id);
            }
        })
        const profiles = []
        let idx=0;
        userIds.forEach(async (userId) => {
            const profile = await Profile.findOne({user: userId}).populate('user', ['name', 'avatar']);
            profiles.push(profile);
            idx++;
            if(idx===userIds.length){
                profiles.sort(dynamicSort("status"));
                res.json(profiles);
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
})

// @route   PUT api/profile/change/:code
// @desc    Change the current team for a user
// @access  Private
router.put("/change/:code", auth, async (req, res)=>{

    try {
        const user = await User.findOneAndUpdate({_id: req.user.id}, {$set: {code: req.params.code}}, {new: true});
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');    
    }
})

module.exports = router;