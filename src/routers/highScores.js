const express = require('express');
const router = express.Router();
const highScoress = require('../models/highScores');

router.post('/savehighscores', async(req,res) => {
    const {username1,highscores} = req.body;  
    //valication
        if(!username1){
            return res
            .status(400)
            .json({title: 'Thất bại!', message: 'Chưa nhập Tên',type: 'error'});
        }
        try {
        const newhighScores = new highScoress({username1, highscores});
        await newhighScores.save();
        res.json({success:true, title: "Thành công!", message:'Lưu điển thành công',type: "success"});
        } catch (error) {
        console.log(error);
        res.status(500).json({title: 'Thất bại!', message:'server lỗi thử lại sau',type: 'error'});
        }
});

module.exports = router;