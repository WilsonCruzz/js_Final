const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/profile');

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expense) profileFields.expense = req.body.expense;
    if(req.body.balance) profileFields.balance = req.body.balance;
    if(req.body.note) profileFields.note = req.body.note;

    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    });
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find()
        .then(profile => {
            if(!profile){
                return res.status(404).json('No profile found');
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            if(!profile){
                return res.status(404).json('No profile found');
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.post('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expense) profileFields.expense = req.body.expense;
    if(req.body.balance) profileFields.balance = req.body.balance;
    if(req.body.note) profileFields.note = req.body.note;

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFields},
        {new: true}
    ).then(profile => res.json(profile));
});

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndDelete({_id: req.params.id})
        .then(profile => {
            profile.then(() => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
}); 

module.exports = router;