import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const GrievanceStatus=()=>{
    var arr=[{date:"",dept:"",email:"",feedback:"",grievance:"",name:"",phone:"",status:"",_id:""}];
    const [Array,setArray] =useState([{date:"",dept:"",email:"",feedback:"",grievance:"",name:"",phone:"",status:"",_id:""}]);

    /*const handleInputs=(event)=>{
      setCat(event.target.value);
    }*/

    const getData=async()=>{
        try{
         const res=await fetch("/grievancelist",{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
         });
         const data=await res.json();
         console.log(data);
         arr=getlist(data);
        
         setArray(arr);
         
         if(!res.status===200){
            const error=new Error(res.err);
            throw error;
        }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
     },[])

     const getlist=(d)=>{
         let a=0;
         //console.log(d);
         let Gdata=[{date:"",dept:"",email:"",feedback:"",grievance:"",name:"",phone:"",status:"",_id:""}];
       for(let i=0;i<d.length;i++){
           for(let j=0;j<d[i].grievances.length;j++){
               //console.log("Inside Loop: "+d[i].grievances[j].name + " "+ d[i].grievances[j].dept
               //+ " " + d[i].grievances[j].grievance);
               if(d[i].grievances[j].dept=="Health Ministry"){
               Gdata[a]=d[i].grievances[j];
               a++;
               }
           } 
       }
       return Gdata;
    }
    
        return(
            <>
            <table className="Gtable table-dark">
            <tr>
                <th>ID</th>
                <th>Names</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Grievance</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Date</th>
            </tr>
            {
              Array.map((cval)=>{
                  return <tr>
                  <td>{cval._id}</td>
                  <td>{cval.name}</td>
                  <td>{cval.email}</td>
                  <td>{cval.phone}</td>
                  <td>{cval.dept}</td>
                  <td>{cval.grievance}</td>
                  <td>{cval.status}</td>
                  <td>{cval.feedback}</td>
                  <td>{cval.date}</td>
                  </tr>
              })
            } 
            </table>
            <Link to="/aAbBcC/updatedocs" className="btn btn-outline-primary mx-4 mb-1 update">Update Documents</Link>
            <Link to="/login" className="btn btn-outline-warning mx-4 mb-1 update">Logout as Admin</Link>
            <br />
            <br />
            <p className='small mx-4' style={{"font-style":"italic"}}>Note: Copy the grievance ID to update.</p>
            </>
        );
    }

export default GrievanceStatus;