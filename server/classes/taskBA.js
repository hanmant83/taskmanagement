let taskDA = require('../classes/taskDA');
const error = require('./errorConstant');
const timezone = require("moment-timezone");

let taskBA={}
taskBA.addTask =async (req)=>{
    let result = {};
    if(req.body){
            let addtaskdetails = await taskDA.addTask(req.body); 
            if(addtaskdetails && addtaskdetails.length>0){
                result = error.getErrorCode(error.errorName.DATA_ADDED);
                result.data={};
                result.data.taskid=addtaskdetails[0].taskid;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
taskBA.getTaskList = async(req)=>{
    let result = {};
    if(req.body){
            let gettaskdetails = await taskDA.getTaskList(req.body); 
            if(gettaskdetails && gettaskdetails.length>0){
                for(let task of gettaskdetails){
                    task.deadline = task.deadline? timezone.tz(task.deadline, 'Asia/Calcutta').format('DD-MM-YYYY'):task.deadline
                }
                result.data={};
                result.data=gettaskdetails;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
taskBA.getStatusList = async(req)=>{
    let result = {};
    if(req.body){
            let getstatusdetails = await taskDA.getStatusList(req.body); 
            if(getstatusdetails && getstatusdetails.length>0){
                result.data={};
                result.data=getstatusdetails;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
taskBA.assignedToTask = async(req)=>{
    let result = {};
    if(req.body){
            let getstatusdetails = await taskDA.assignedToTask(req.body); 
            if(getstatusdetails && getstatusdetails.length>0){
                result.data={};
                result.data=getstatusdetails;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
taskBA.markAsComplete = async(req)=>{
    let result = {};
    if(req.body){
            let getstatusdetails = await taskDA.markAsComplete(req.body); 
            if(getstatusdetails && getstatusdetails.length>0){
                result.data={};
                result.data=getstatusdetails;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
taskBA.updateTask =async (req)=>{
    let result = {};
    if(req.body){
            let addtaskdetails = await taskDA.updateTask(req.body); 
            if(addtaskdetails && addtaskdetails.length>0){
                result = error.getErrorCode(error.errorName.DATA_ADDED);
                result.data={};
                result.data.taskid=addtaskdetails[0].taskid;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
taskBA.deleteTask =async (req)=>{
    let result = {};
    if(req.body){
            let addtaskdetails = await taskDA.deleteTask(req.body); 
            if(addtaskdetails && addtaskdetails.length>0){
                result = error.getErrorCode(error.errorName.DATA_ADDED);
                result.data={};
                result.data.taskid=addtaskdetails[0].taskid;
            } else{
                result = error.getErrorCode(error.errorName.SOMETHING_WRONG);
            }           
       
    }else{
        result = error.getErrorCode(error.errorName.INPUT_REQUIRED); 
    }
    return result;
}
 module.exports = taskBA