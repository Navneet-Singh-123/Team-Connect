const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {generateTeamCode} = require("../../middleware/utils")
const {check, validationResult} = require("express-validator")

const Team = require('../../models/Team');
const User = require('../../models/User');

// @route   POST api/teams
// @desc    Create a Team
// @access  Private
router.post("/", [auth, [
    check("name", "Name is required"),
    check("description", 'Description is required') 
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    try {
        const teamCode = generateTeamCode();
        const user = await User.findById(req.user.id);
        user.teams.push({code: teamCode, isAdmin: true});
        await user.save();
        const newTeam = new Team({  
            name: req.body.name, 
            description: req.body.description, 
            code: teamCode, 
            members: []
        })
        newTeam.members.push({user: req.user.id});
        const team = await newTeam.save();
        res.json(team);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   POST api/teams/enter
// @desc    Register for a team
// @access  Private
router.post('/enter', [auth, [
    check('code', 'Team code is required')
]], async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const team=await Team.findOne({code: req.body.code})
        const user=await User.findById(req.user.id);
        if(!team){
            return res.status(404).json({msg: 'Team not found'});
        }
        if(team.members.filter(member => member.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'You are already in this team'});
        }
        user.teams.push({code: req.body.code, isAdmin: false});
        team.members.push({user: req.user.id});
        await user.save();
        await team.save();
        res.status(200).json({msg: "You are successfully registered in this team"})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/teams/:id
// @desc    Enter in the team
// @access  Private
router.put('/:id', auth, async(req, res)=>{
    try {
        const team = await Team.findById(req.params.id);
        const user = await User.findById(req.user.id);
        user.code = team.code;
        await user.save();
        res.status(200).json({msg: 'Successfully entered in the selected team'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error') 
    }
})

// @route   GET api/teams
// @desc    Get all the teams of the user
// @access  Private
router.get("/", auth, async(req, res)=>{
    try {
        const allTeams=[];
        const user = await User.findById(req.user.id);
        user.teams.map(async (team, idx)=>{
            const curTeam =  await Team.findOne({code: team.code});
            allTeams.push(curTeam);
            if(idx==user.teams.length-1){
                return res.json(allTeams)
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error') 
    }
})


module.exports = router;