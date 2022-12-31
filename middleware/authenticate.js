const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')


const authenticate = async (req,res,next)=>{
    try{

        const token = await req.cookies.dsatokens;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({email : verifyToken.email, "tokens.token" : token})

        if(!rootUser){
            throw new Error("User not found")
        }
        req.rootUser = rootUser
        next();

    } catch(err){
        res.status(401).send("Unauthorised User");
        console.log(err);
    }
}

module.exports = authenticate;