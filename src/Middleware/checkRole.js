const checkRole = async (req,res,next) =>{
    if(req.data.role < 2){
        return res.redirect('/');
    }
    next();
};
module.exports = checkRole;