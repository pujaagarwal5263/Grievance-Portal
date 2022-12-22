import React from 'react';
import { useEffect, useState } from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';

const About=()=>{
    //const history=useHistory();
    const [userData,setUserData] =useState();

    const callAboutPage=async()=>{
       try{
         const res = await fetch("/about",{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
         });
         const data=await res.json();
         setUserData(data);

         console.log(`this is useState daa: ${userData.name}`);
         if(!res.status===200){
             const error=new Error(res.err);
             throw error;
         }
       }catch(err){
           console.log(err);
           //history.push("/login");
       }
    }
    useEffect(()=>{
       callAboutPage();
    },[])
    
    if(userData){
        return(
            <>
            <div className="mx-4">
            <h1 className='text-center my-2'>My Profile</h1>
            <hr />
            <form method="GET">
            <h3 className="text-uppercase" style={{"textDecoration":"underline"}}>Personal Information</h3>
            <h2>Name: <span>{userData.name}</span></h2>
            <h3>Address: {userData.address}</h3>
            <br></br>
            <h3 className="text-uppercase" style={{"textDecoration":"underline"}}>Contact Information</h3>
            <h4>Phone: {userData.phone}</h4>
            <h4>Email: {userData.email}</h4>
            <br></br>
            <h3 className="text-uppercase" style={{"textDecoration":"underline"}}>grievances</h3>
            <br />
                <table className="table-dark">
                <tr>
                    <th>Date</th>
                    <th>Department</th>
                    <th>Grievance</th>
                    <th>Status</th>
                    <th>Feedback</th>
                </tr>
                { userData.grievances.map((cval)=>{
                return <tr>
                <td>{cval.date}</td>
                <td>{cval.dept}</td>
                <td>{cval.grievance}</td>
                <td>{cval.status}</td>
                <td>{cval.feedback}</td>
                </tr> }) }
                </table>
                <br />
        </form> 
        </div>
        <div className="contact_info bg-dark text-white">
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
               <img src={email} alt="not found" height="50" width="50"/>
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
        );
    }
    else{
        return(
            <>
            <p className='maintext'>Unable to load data. Try to refresh or relogin.</p>
            </> 
        ); 
    }
}

export default About;