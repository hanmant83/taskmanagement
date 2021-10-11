const jwt = require('jsonwebtoken');
const authDA = require('./authDA');

const authenticateToken=(req, res, next) =>{ 
    const authHeader = req.headers['authorization'] 
    const token = authHeader;
    if (token == null) 
    return res.sendStatus(401) 
    jwt.verify(token, process.env.SECRET_KEY, (err ,user) => { 
        if (err) 
        return res.sendStatus(403) 
        req.body.loginname = user.loginname;
        req.body.password = user.password; 
        next() 
    }) 
}
const checkUserInDB = async(req,res,next)=>{
    let result = await authDA.validateuser(req.body);
    if(result && result.length>0){
        next();
    }else{
        res.sendStatus(401);
    }
  }
  module.exports={
    authenticateToken,
    checkUserInDB
  }