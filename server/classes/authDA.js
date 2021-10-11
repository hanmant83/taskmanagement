const dbhelper=require('../dbhelper');

let AuthDA={};
AuthDA.validateuser = async(logindetails)=>{
  let queryText = `select * from task.users where email=($1) and password=($2) and inactive=false`;
  let values=[logindetails.email,logindetails.password];
  let user = await dbhelper.executeNonQuery(queryText,values);
  return user.rows;
}

module.exports=AuthDA;