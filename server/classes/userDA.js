const dbhelper=require('../dbhelper');
let userDA = {};
userDA.addUser = async(input)=>{
    let queryText = `insert into task.users(firstname,lastname,email,password,inactive,createdat) values(($1),($2),($3),($4),false,now()) returning userid`;
    let values=[input.firstname,input.lastname,input.email,input.password];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
userDA.getUserDetails =async(input)=>{
    let queryText = `select * from task.users where email = ($1)`;
    let values=[input.email];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
userDA.getUserList = async()=>{
    let queryText = `select * from task.users where inactive=false`;
    let values=[];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}

module.exports=userDA;