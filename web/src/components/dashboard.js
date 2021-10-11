import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import "./Login.css";
import AddTask from './addtask'
import {
useHistory
  } from "react-router-dom";
  function getElement(item,handleClick,onEdit,onDelete){
    let element
       element =<div> <button onClick={()=>onEdit(item)} className="btn btn-primary btn-sm m-2">Edit</button><button onClick={()=>handleClick(item)} className="btn btn-primary btn-sm m-2">Mark as Complete</button><button onClick={()=>onDelete(item)} className="btn btn-danger btn-sm m-2">Delete</button></div>;   
    return element;
}
function getUserList(item,userList,handleChange){
    let element
    if(item.assignedto){
      element=item.assignedto
    }else{
        let res;
        if(userList){
         res =userList.map(user=>{
            return <option value={JSON.stringify({userid:user.userid,item})}>{user.firstname + " "+user.lastname}</option> 
         })
        }
       element =<select name="assignedto" id="assignedto" onChange={handleChange}><option value="">--Assign task--</option>{res}</select>
       //<select name="assignedto" id="assignedto">{userList && userList.map((user=>{<option value={user.email}>user.email</option>}))}</select>;
    }
   console.log("element",element)
    return element;
}
async function assignedTo(credentials) {
    return fetch('http://localhost:7010/task/assignedto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data =>data.json())
       .then(res => {return res.token})
   }
   async function markComplete(credentials) {
    return fetch('http://localhost:7010/task/markascomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data =>data.json())
       .then(res => {return res.token})
   }
   async function deleteTask(credentials) {
    return fetch('http://localhost:7010/task/deletetask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data =>data.json())
       .then(res => {return res.token})
   }
export default function Dashboard({token}) {
  const history = useHistory();
  const [taskList, setTaskList] = useState();
  const [userList, setUserList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [oneTask ,setOneTask] = useState();
  const [flag ,setFlag] = useState(0);
    useEffect(() => {
        if(token){
        fetch('http://localhost:7010/task/tasklist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({priority:2})
          })
      .then(results => results.json())
      .then(data => {
          console.log(data.data)
        setTaskList(data.data);
        fetch('http://localhost:7010/user/userlist')
        .then(results => results.json())
        .then(data => {
            console.log(data.data)
            setUserList(data.data);
        });
      });

    }else{
        history.push("/");
    }
  }, [flag]);

  const handleChange = async (event)=>{
   let data = JSON.parse(event.target.value);
   const token = await assignedTo({
    assignedto:data.userid,
    taskid:data.item.taskid
  });
  setFlag(flag+1);
   }
   const handleClick = async (event)=>{
      console.log(event)
      const token = await markComplete({
        taskid:event.taskid
      });
      setFlag(flag+1);
    }
  const handleSubmit = async event => {
    event.preventDefault();
  }
  const openModal =()=>{
    setOneTask({})
    setShowModal(true)
    console.log('dashboard',showModal)
  }
  const hideModal =async()=>{
    setOneTask({})
    setShowModal(false)
    console.log('dashboard',showModal)
    setFlag(flag+1);
  }
  const onEdit = async(oneTask)=>{
      console.log("oneTask",oneTask)
      setOneTask(oneTask)
      setShowModal(true)
  }
  const onDelete = async(item)=>{
    const token = await deleteTask({
        taskid:item.taskid
      });
      setFlag(flag+1);
}
  return(
    <div>
        <h5>Record List</h5>
        <table className="table table-striped">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Task</th>
<th scope="col">Description</th>
<th scope="col">Priority</th>
<th scope="col">Status</th>
<th scope="col">Deadline</th>
<th scope="col">Assignedto</th>
<th scope="col">Action</th>
</tr>
</thead>
<tbody>
{taskList && taskList.map(item => (
<tr key={item.taskid}>
<td>
  {item.taskid} 
</td>
<td>
  {item.taskname} 
</td>
<td>
  {item.description} 
</td>
<td>
  {item.priority} 
</td>
<td>
  {item.statusname} 
</td>
<td>
  {item.deadline} 
</td>
<td>
  {getUserList(item,userList,handleChange)} 
</td>
<td>
{getElement(item,handleClick,onEdit,onDelete)}
</td>
</tr>   
))}
</tbody>
</table>
<AddTask show={showModal} handleModal={hideModal} oneTask={oneTask}>
        </AddTask>
<button onClick={openModal} className="btn btn-primary btn-sm m-2">Add new task</button>
    </div>
)
}

