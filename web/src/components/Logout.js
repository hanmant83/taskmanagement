import {
    useHistory
      } from "react-router-dom";
export default function Logout({ setToken }) {
    const history = useHistory();
    const handleSubmit = async event => {
        event.preventDefault();
        localStorage.removeItem('token')
        history.push('/')
      }
    return (
   <div>
       <button type="submit" className="logout" onClick={handleSubmit}>Logout</button>
   </div>
        
    );
  }
  
 