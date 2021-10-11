const dbhelper=require('../dbhelper');
let taskDA={};
taskDA.addTask = async(input)=>{
    let queryText = `insert into task.task(taskname,description,priority,status,deadline,inactive,createdat) 
    values(($1),($2),($3),($4),($5),false,now()) returning taskid`;
    let values=[input.taskname,input.description,input.priority,input.status,input.deadline];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
taskDA.getStatusList = async(input)=>{
    let queryText = `select * from task.masterstatus where inactive=false`;
    let values=[];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
taskDA.getTaskList = async(input)=>{
    let queryText = `select t.taskid, t.taskname,t.description,t.priority,ms.statusname,ms.statusid,t.deadline,u.firstname||' '||u.lastname as assignedto
    from task.task t inner join task.masterstatus ms on t.status = ms.statusid
    left join task.users u on t.assignedto = u.userid  
     where t.inactive=false order by t.priority`;
    let values=[];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
taskDA.assignedToTask = async(input)=>{
    let queryText = `update task.task set assignedto=($1) where taskid=($2) returning taskid`;
    let values=[input.assignedto,input.taskid];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
taskDA.markAsComplete = async(input)=>{
    let queryText = `update task.task set status=3 where taskid=($1) returning taskid`;
    let values=[input.taskid];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
taskDA.updateTask = async(input)=>{
    let queryText = `update task.task set taskname=($1),description=($2),priority=($3),status=($4),deadline=($5) where taskid=($6) returning taskid`;
    let values=[input.taskname,input.description,input.priority,input.status,input.deadline,input.taskid];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
taskDA.deleteTask = async(input)=>{
    let queryText = `update task.task set inactive=true where taskid=($1) returning taskid`;
    let values=[input.taskid];
    let user = await dbhelper.executeNonQuery(queryText,values);
    return user.rows;
}
module.exports=taskDA