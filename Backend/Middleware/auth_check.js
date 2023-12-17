const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SECRET_TOKEN_KEY);
        // decoded will have the user object passed to create the token in /login api
        req.user = decoded;
        next();
    }catch(e){
        res.status(401).send({
            message:"Invalid Request !",
            error:e
        })
    }
}