const express = require('express');
const router = express.Router();
const Quizt = require('../models/generalquestion');
const verifyToken = require('../Middleware/auth');
const checkrole = require('../Middleware/checkRole');

//@create-Quizt
router.post('/api/quizt',verifyToken,checkrole, async(req,res) =>{
    const {question,choice1,choice2,choice3,choice4,answer} = req.body;
    //vaication
    if(!question ||!choice1||!choice2||!choice3||!choice4||!answer){
        return res.status(400).json({title: 'Thất bại!', message: 'Thiếu thông tin ',type: 'error'}); 
    }
    try {
        const question1 = await Quizt.findOne({ question });
        if(question1){
            return res.status(400).json({title: 'Thất bại!', message: 'Câu hỏi này đã tồn tại',type: 'error'});
        }
        const newQuestion = new Quizt({
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        answer
        });
        await newQuestion.save();

        res.json({
            success:true, 
            title: "Thành công!", 
            message:'Tạo câu hỏi thành công',
            type: "success",
            question: newQuestion});
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            title: 'Thất bại!', 
            message:'server lỗi thử lại sau',
            type: 'error'});
    }
});

//@delete quizt

router.delete('/:id',verifyToken,checkrole, async(req,res) =>{
    try {
        const quiztDeleteCondition = {_id: req.params.id};
        const deletequizt = await Quizt.findOneAndDelete(quiztDeleteCondition);

        //check user
        res.json({title: 'Thành công!',success:true,quizt: deletequizt,type: "success",message:'Xoá câu hỏi thành công'});
    } catch (error) {
        res.status(500).json({
            title: 'Thất bại!', 
            message:'server lỗi thử lại sau',
            type: 'error'
        });
    }
});

router.put('/:id',verifyToken,checkrole, async(req,res) =>{
    const {question,choice1,choice2,choice3,choice4,answer} = req.body;
    if(!question ||!choice1||!choice2||!choice3||!choice4||!answer){
        return res.status(400).json({title: 'Thất bại!', message: 'Thiếu thông tin ',type: 'error'}); 
    }
    try {
        let updatedQuizz =({
        question,
        choice1,
        choice2,
        choice3,
        choice4,
        answer
        });
        const quizUpdatedCondition = {_id: req.params.id};
        updatedQuizz = await Quizt.findOneAndUpdate(quizUpdatedCondition, updatedQuizz,{new: true});
        if(!updatedQuizz){
            return res.status(401)
            .json({
                title: 'Thất bại!', 
                message:'Không tìm thấy câu hỏi hoặc Bạn không có quyền',
                type: 'error'
            });
        }
        res.json({
            success:true, 
            title: "Thành công!", 
            message:'Sửa câu hỏi thành công',
            type: "success",
            Quizz: updatedQuizz});
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            title: 'Thất bại!', 
            message:'server lỗi thử lại sau',
            type: 'error'});
    }
});

module.exports = router;