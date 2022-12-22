import React, { useState } from 'react';

const UpdateDocs=()=>{
    const [gId,setGId]=useState('');
    const [_id,setMId]=useState('');
    const[email,setEmail]=useState('');
    const[dept,setDept]=useState('');
    const[status,setStatus]=useState('');
    const [feedback,setFeedback]=useState('');
    const [Data,setData] =useState([{date:"",dept:"",email:"",feedback:"",grievance:"",name:"",phone:"",status:"",_id:""}]);
    
    const getGrievance=async(e)=>{
      e.preventDefault();
      try{
       const res=await fetch('/grievancelist',{
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials:"include"
       });
       const data=await res.json();
       console.log(data);

       const obj=thisGrievance(data);
       setData(obj);
       setEmail(obj.email);
       setDept(obj.dept);

       if(!res.status===200){
        const error=new Error(res.err);
        throw error;
        }
      }catch(err){
          console.log(err);
      }      
    }

    const updateData=async(e)=>{
        e.preventDefault();
        try{
            //?_id=${_id}gId=${gId}&status=${status}&feedback=${feedback}
         const res=await fetch(`/aAbBcC/updatedocs`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                'Accept': 'application/json'
            },
           
            body:JSON.stringify({
                email, dept, _id, gId, status,feedback
           })    
         })
         //console.log("patch");
         const data=await res.json();
         
         if(res.status===400 || !data){
             window.alert("Could not connect to backend");
         }
         else{
             window.alert("Grievance Updated Successfully")
         }
        }catch(err){
            console.log(err);
        }
    }

    const thisGrievance=(d)=>{
        let a=0;
        //let d=doc[0];
        //let d=t.grievances;
      for(let i=0;i<d.length;i++){
          for(let j=0;j<d[i].grievances.length;j++){
              if(d[i].grievances[j]._id==gId){
                setMId(d[i]._id);
               // setEmail(d[i].email);
                return d[i].grievances[j];
              }
          }
      }
      return;
   }
    return(
        <div className='mx-3'>
        <br />
        <h1 className="text-center mt-1">Update Grievances</h1>
        <hr />
        <div className='jumbotron'>
        <form method="GET">
        <label for="GId">Enter the Grievance Id:</label>
        <input type="text" id="GId" name="GId" value={gId} onChange={(e)=>setGId(e.target.value)} className='mx-2 col-3'/>
        <br />
        <input type="submit" value="Get Data" name="submitgid" id="submitgid" className='btn btn-outline-primary'
            onClick={getGrievance}
        />
        <br />
        </form>
        <div className="formdata">
        <br />
        <div className='row'>
        <h4 className='text-uppercase' style={{"textDecoration":"underline"}}>Grievance Information</h4></div>
        <div className='row'>
        <h6 className=''>Name:</h6><p className='mx-2'> &nbsp;{Data.name}</p></div>
        <div className='row'>
        <h6 >Phone:</h6><p className='mx-2'>{Data.phone}</p></div>
        <div className='row'>
        <h6 >Grievance:</h6><p className='mx-2'>{Data.grievance}</p>
        </div>
        
        <form method="POST">
        <div className='row'>
        <h6 >Email:</h6><p name="email" type="text" className='mx-2' value={email}>{email}</p></div>
        <div className='row'>
        <h6>Department:</h6><p name="dept" type="text" className='mx-2' value={dept}>{dept}</p></div>
        <div className='row'>
        <h6 >Main ID: </h6><input className='mx-2 col-3' type="text" value={_id} name="_id" /></div>
        <br />
        <div className='row'>
        <h6 >This ID: </h6><input type="text" className='mx-2 col-3' value={gId} name="gId" /></div>
        
        <br />
        <div className='row'>
        <h6>Status:</h6>
        <select name="status" id="status" onChange={(e)=>setStatus(e.target.value)} className='mx-2 col-3'>
        <option value="Not Seen">Not Seen</option>
        <option value="In Process">In Process</option>
        <option value="Referred to concerned Authority">Referred to concerned Authority</option>
        <option value="Closed">Closed</option>
        </select>
        </div>
        
        <br />
        <div className='row'>
        <h6>Feedback:</h6>
        <input type="text" name="feedback" className='mx-2 col-4' value={feedback} onChange={(e)=>setFeedback(e.target.value)}/>
        </div>
        <br></br>
        <div className='row'>
        <h6>Date of Filing:</h6><p>{Data.date}</p></div>
        {/* <h6>Feedback Document:
        <input type="file" id="myFile" name="filename"></input>
        </h6>*/}
        <br></br>
        <div className='row'>
        <input type="submit" value="Update Status" className='btn btn-outline-primary' onClick={updateData}/> 
        </div>
        </form>

        </div>
        </div>
        </div>
    );
}

export default UpdateDocs;