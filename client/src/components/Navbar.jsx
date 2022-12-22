import React, {useContext} from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar=()=>{
  const {state,dispatch} = useContext(UserContext);
  
  const RenderMenu=()=>{
     if(state){
       return(
         <>
      <NavLink className="nav-item nav-link active" to="/">Home </NavLink>
      <NavLink className="nav-item nav-link" to="/grievance">Grievance</NavLink>
      <NavLink className="nav-item nav-link" to="/about">About</NavLink>
      <NavLink className="nav-item nav-link " to="/logout">Logout</NavLink>
         </>
       )
     }else{
       return(
         <>
         <NavLink className="nav-item nav-link active" to="/">Home </NavLink>
         <NavLink className="nav-item nav-link" to="/grievance">Grievance</NavLink>
         <NavLink className="nav-item nav-link" to="/about">About</NavLink>
         <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
         <NavLink className="nav-item nav-link " to="/signup">Signup</NavLink>
         </>
       )
     }
  }
   return(
       <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <NavLink className="navbar-brand" to="/">Grievance Portal</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" 
  aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav ml-auto">
    <RenderMenu />
    </div>
  </div>
</nav>
       </>
   )
};

export default Navbar;
