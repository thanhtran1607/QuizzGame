const jwt = require('jsonwebtoken');
const userRole = require('../models/user');
const verifyToken =async (req,res,next) =>{
    const token = req.cookies.token;
    
    if(!token){
        return res.redirect('login');
    }
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        userRole.findOne({
            _id: decoded.userId
        }).then(data =>{
            if(data){
                req.data = data;
                next();
            }else{
                res.redirect('login');
            }
        });
    } catch (error) {
        return res.redirect('login');
    }
};
module.exports = verifyToken;