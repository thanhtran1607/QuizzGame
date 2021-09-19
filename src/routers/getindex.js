const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/auth');
const generalquestions = require('../models/generalquestion');
const highScoresdb = require('../models/highScores');
const checkrole = require('../Middleware/checkRole');


router.get('/register',(req,res) =>{
    res.render('register');
});

router.get('/login',(req,res) =>{
    res.render('login');
});
router.get('/',verifyToken,(req,res) =>{
    res.render('home');
});
router.get('/game',verifyToken, (req,res) =>{
    res.render('game');
});
router.get('/endgame',verifyToken,(req,res) =>{
    res.render('endgame');
});
router.get('/highscores',verifyToken,(req,res) =>{
    res.render('highScores');
});
router.get('/questionManagement',verifyToken,checkrole,(req,res) =>{
    res.render('questionManagement');
});
router.get('/creatQuizz',verifyToken,checkrole,(req,res) =>{
    res.render('creatQuizz');
});
router.get('/manager',verifyToken,checkrole,(req,res) =>{
    res.render('Manager');
});





//@ get api quizt
router.get('/api/game',async(req,res) =>{
    try {
        const quizts = await generalquestions.find();
        res.json(quizts);

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:'Server lỗi!!'});
    }
});


router.get('/api/highscores' ,async(req,res) =>{
    try {
        const highScores = await highScoresdb.find();
        res.json(highScores);
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:'Server lỗi!!'});
    }
});
module.exports = router;