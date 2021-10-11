let userDA = require('./userDA');
const error = require('./errorConstant');

let userBA ={};
userBA.addUser = async(req)=>{
    let result = {};
    if(req.body){
        let userdetailsresult = await userDA.getUserDetails(req.body);
        if(userdetailsresult && userdetailsresult.length==0){
            let adduserdetails = await userDA.addUser(req.body); 
            if(adduserdetails && adduserdetails.length>0){
                result = error.getErrorCode(error.errorName.DATA_ADDED);
                result.data={};
                result.data.userid=adduserdetails[0].userid;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
        }else{
            result = error.getErrorCode(error.errorName.USER_EXISTS);
        }
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
userBA.getUserList = async(req)=>{
    let result = {};
    if(req.body){
            let getuserdetails = await userDA.getUserList(); 
            if(getuserdetails && getuserdetails.length>0){
                result.data={};
                result.data=getuserdetails;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}

module.exports=userBA