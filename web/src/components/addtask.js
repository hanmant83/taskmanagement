import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
async function addTask(details) {
    return fetch('http://localhost:7010/task/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data =>data.json())
       .then(res => {return res})
   }
   async function updateTask(details) {
    return fetch('http://localhost:7010/task/updatetask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data =>data.json())
       .then(res => {return res})
   }
export default function AddTask({ show,handleModal,oneTask }) {
    const style = show ?{ display: 'block'}:{display:'none'}
    const [taskid,setTaskId]=useState();
    const [taskname,setTaskName]=useState();
    const [description,setDescription]=useState();
    const [priority,setPriority]=useState();
    const [status,setStatus]=useState();
    const [deadline,setDeadline]=useState();
    useEffect(() => {
        if(oneTask){
            console.log(oneTask)
        setTaskId(oneTask.taskid);    
        setTaskName(oneTask.taskname);
        setDescription(oneTask.description);
        setPriority(oneTask.priority);
        setStatus(oneTask.statusid);
        setDeadline(oneTask.deadline)
    }
    },[oneTask])
    async function handleSubmit(event) {
        event.preventDefault();
        if(taskid){
            const result = await updateTask({
                taskid,
                taskname,
                description,
                priority,
                status,
                deadline
              });
        }else{
        const result = await addTask({
            taskname,
            description,
            priority,
            status,
            deadline
          });
        }
          await handleModal();
      }
    console.log("showModel",show)
      if(show){
      return (
        <div class="modal" tabindex="-1" role="dialog" id="modal" style={style}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={handleModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form >
              <div className="form-row">
    <div className="form-group col-md-12">
    <label>Task Name</label>
    <input type="text" className="form-control" id="name" value={taskname} name="name" onChange={(e) => setTaskName(e.target.value)} />
    </div>
    <div className="form-group col-md-12">
    <label>Description</label>
    <input type="text" name="contact" value={description} className="form-control" id="mobile" onChange={(e) => setDescription(e.target.value)}  />
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-12">
    <label>Priority</label>
    <select name="priority" id="priority" className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
    <option value="">--select--</option>
     <option value="1">1</option>
     <option value="2">2</option>
     <option value="3">3</option>
</select>
    </div>
    <div className="form-group col-md-12">
    <label>Status</label>
    <select name="status" id="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
    <option value="">--select--</option>
     <option value="1">Pending</option>
     <option value="2">Rejected</option>
     <option value="3">Comleted</option>
</select>
    </div>
  </div>
  <div className="form-group col-md-12">
    <label>Deadline</label>
    <input type="date" name="startDate" className="form-control" value={deadline} id="sdate" onChange={(e) => setDeadline(e.target.value)} />
    </div>
  </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={handleSubmit}>Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={handleModal}>Close</button>
            </div>
            
          </div>
        </div>
      </div>
      );
      }else{
          return (null)
      }
  }
  
 