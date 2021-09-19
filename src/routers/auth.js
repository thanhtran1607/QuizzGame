const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//@router register
router.post('/register',async (req , res) => {
    const { username, password} = req.body;
    //valication
    if(!username ||  !password){
        return res
        .status(400)
        .json({
            success:false,
            title: 'Thất bại!', 
            message: 'Chưa nhập tài khoản hoặc mật khẩu',
            type: 'error'
        });
    }
    try {
            //check user
        const user = await User.findOne({ username });
        if(user){
            return res.status(400).json({
                title: 'Thất bại!', 
                message: 'Tên tài khoản đã tồn tại',
                type: 'error'
            });
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username, 
            password: hashedPassword,
            role:1
        });

        await newUser.save();
            //return token 
        const accessToken = jwt.sign(
            {userId: newUser._id},
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success:true, 
            title: "Thành công!",
            message:'Tạo tài khoản thành công',
            accessToken,
            type: "success"
        });
    } catch (error) {
        console.log('error');
        res.status(500).json({
            title: 'Thất bại!', 
            message:'server lỗi thử lại sau',
            type: 'error'
        });
    }
});
    //@ router login
router.post('/login', async(req,res) => {
        const {username,password} = req.body;   
            //valication
    if(!username ||  !password){
        return res
        .status(400)
        .json({title: 'Thất bại!', 
        message: 'Chưa nhập tài khoản hoặc mật khẩu',
        type: 'error'});
    }
    try {
        //check user
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                title: 'Thất bại!',
                message:'tài khoản hoặc mật khẩu sai',
                type: 'error'});
        }
        const passwordValid = await argon2.verify(user.password,password);

        if(!passwordValid){
            return res.status(400).json({
                title: 'Thất bại!',
                message:'tài khoản hoặc mật khẩu sai',
                type: 'error'
            });
        }
        const accessToken = jwt.sign(
            {userId: user._id},
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success:true,
            title: "Thành công!", 
            message:'Đăng nhập thành công',
            accessToken,
            type: "success"
        });

    } catch (error) {
        console.log('error');
        res.status(500).json({
            title: 'Thất bại!', 
            message:'server lỗi thử lại sau',
            type: 'error'
        });
    }
});

module.exports = router;