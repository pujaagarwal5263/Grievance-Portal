import React, {useContext, useState} from 'react';
import login from '../images/login.gif';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import phone from '../images/telephone.png';
import mail from '../images/email.png';
import address from '../images/address.png';

const Login=()=>{
  const {state,dispatch} = useContext(UserContext);

  const history=useHistory();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const loginUser=async(e)=>{
     e.preventDefault();

     const res= await fetch('/signin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          'Accept': 'application/json'
        },
        
        body:JSON.stringify({
            email,password
        })
     });
     const data=await res.json();
     
     if(res.status===400 || !data){
       window.alert("Invalid Credentials");
     }else{
      dispatch({type:"USER",payload:true})
      window.alert("Login Successful");
      history.push("/");
     }
  }
  return(
    <>
      <section className="signup">
       <div className="container mt-5">
         <div className="signup-content">
           <div className="signup-form row">
             <div className="signup-image col-md-6">
              <figure>
              <img src={login} alt="not found"/>
              </figure>
              <NavLink to="/signup" className="login-image-link">CREATE AN ACCOUNT  | </NavLink>
              <NavLink to="/AdminLogin" className="login-image-link"> &nbsp;LOGIN AS ADMIN</NavLink>
             </div>
             <div className="col-md-6">
             <h2>Log In</h2>
             <hr/>
             <form method="POST" className="register-form" id="register-form">
            
              <div className="form-group">
                <label htmlFor="email">
                Email ID:
                </label>
                <input type="email" name="email" id="email" autoComplete="off" 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Your email ID here" className='mx-2'></input>
              </div>
              
              <br />
              <div className="form-group">
                <label htmlFor="password">
                Password:
                </label>
                <input type="password" name="password" id="password" autoComplete="off" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password" className='mx-2'></input>
              </div>
<br />
              <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit login btn btn-outline-primary"
                onClick={loginUser} value="Log In"/>
              </div>
             </form>
             </div>
           </div>
         </div>
       </div>
      </section>
      <div className="contact_info bg-dark text-white mt-5">
        <div className="container-fluid">
        <br />
         <div className="row">
           <div className="col-lg-12 row">   
             <div className="contact_info_item col-1 abc">
               <img src={phone} alt="not found" height="50" width="50"/>
             </div>
             <div className="contact_info_item col-2 abc">
               <h6>Phone</h6>
               <p>+1800 266 1236</p>
             </div>

<div className="col-1"></div>
             
             <div className="contact_info_item col-1 abc">
               <img src={mail} alt="not found" height="50" width="50"/>
             </div>
             <div className="contact_info_item col-3 abc">
               <h6>Email</h6>
               <p>filemygrievance@gmail.com</p>
             </div>
             

<div className="col-1"></div>
             <div className="contact_info_item col-1 abc">
               <img src={address} alt="not found" height="50" width="50"/>
             </div>
             <div className="contact_info_item col-2 abc">
               <h6>Address</h6>
               <p>New Delhi</p>
             </div>

           </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default Login;