import React from 'react';
import { useEffect, useState } from 'react';
import convo from '../images/convo.png'

const Home=()=>{
    const [userName,setUserName] =useState();
    const [show,setShow]=useState(false);

    const userHome=async()=>{
       try{
         const res = await fetch("/getdata",{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
         });
         const data=await res.json();
         setUserName(data.name);
         setShow(true);
         if(!res.status===200){
             const error=new Error(res.err);
             throw error;
         }
       }catch(err){
           console.log(err);
       }
    }
    useEffect(()=>{
       userHome();
    },[])
   
    if(userName){
        return(
            <div className="row">
            <div className="col-md-5">
            <img src={convo} alt="not found"/>
            </div>
            <p className='maintext'>Hello {userName}! Welcome Back!! </p>
            </div> 
        );
    }
   return(
       <>
       <br />
       <div className="row">
       <div className="col-md-5">
       <img src={convo} alt="not found"/>
       </div>
       <p className='maintext' >Please login to file a grievance</p>
       </div>
       </>
   )
};


export default Home;
