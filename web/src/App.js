import React from "react";
import Login from "./components/login";
import Register from "./components/registration";
import Dashboard  from "./components/dashboard";
import Logout from "./components/Logout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import useToken from './useToken';
function App() {
  const { token, setToken } = useToken();
  console.log("token",token)
  if(!token) {
    console.log("hanamnt")
    return (
      <Router>
        <Route exact path="/">
    <Login setToken={setToken} />
    </Route>
    <Route exact path="/register">
     <Register />
   </Route>
   <Route exact path="/dashboard">
    <Logout />
     <Dashboard />
   </Route>
    </Router>
    )
  }
  return (
    <Router>
     <Route exact path="/">
    <Login setToken={setToken} />
    </Route>
   <Route exact path="/register">
     <Register />
   </Route>
   <Route exact path="/dashboard">
    <Logout />
     <Dashboard token={token} />
   </Route>
   </Router>
      
  );
}

export default App;
