import React from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';
import { useEffect, useState } from 'react';

const Grievance=()=>{
    const [userData,setUserData] =useState({
      name:"",email:"",phone:"",dept:"",grievance:""});

    const userContact=async()=>{
       try{
         const res = await fetch("/getdata",{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
         });
         const data=await res.json();
         setUserData({ ...userData,name:data.name,email:data.email,
          phone:data.phone});
         //console.log(`this is useState daa: ${userData.name}`);
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
       userContact();
    },[])

    //storing data of grievance array
    const handleInputs=(event)=>{
      const name=event.target.name;
      const value=event.target.value;

      setUserData({ ...userData,[name]:value});
    }

    //send data to backend
    const fileGrievance=async(event)=>{
       event.preventDefault();

       const {name,email,phone,dept,grievance}=userData;
       const res=await fetch("/grievance",{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,email,phone,dept,grievance
          })
       });

       const data= await res.json();
       if(!data){
         console.log("Grievance Not Filed");
         window.alert("Try to relogin. Your grievance was not filed!")
       }else{
         alert("Grievance Filed Successfully!! We'll inform you when there will be a response");
          setUserData({...userData,grievance:""});
       }
    }
  return(
    <>
      {/* Contact Us Form */}
      <div className="contact_form mx-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">
                  <h2 className='text-center'>File a Grievance</h2>
                </div>

                <form method="POST" className='jumbotron'>
                  <div className="contact_form_name d-flex row">
                    <input type="text" id="contact_form_name" 
                    className="contact_form_name input_field col-2"
                    name="name"
                    value={userData? userData.name : ""}
                    onChange={handleInputs}
                    placeholder="Your Name" required="true"/>
<div className="col-1"></div>

                    <input type="email" id="contact_form_email" 
                    className="contact_form_email input_field col-4"
                    name="email"
                    value={userData? userData.email : ""}
                    onChange={handleInputs}
                    placeholder="Your Email" required="true"/>
<div className="col-1"></div>

                    <input type="text" id="contact_form_contact" 
                    className="contact_form_contact input_field col-3"
                    name="phone"
                    value={userData? userData.phone : ""}
                    onChange={handleInputs}
                    placeholder="Your Phone Number" required="true"/>
                  </div>
<br />
                  <label for="complaint">Choose a department:</label>
                    <select name="dept" id="complaint" onChange={handleInputs}>
                    <option value="">--Select department--</option>
                     <option value="Education">Education</option>
                     <option value="Health Ministry">Health Ministry</option>
                     <option value="Service Provider">Service Provider</option>
                     <option value="Others">Others</option>
                    </select>
<br />
                  <div className="contact_form_text">
                     <textarea className="text_field contact_form_message" id="msg" 
                     cols="82" rows="5" placeholder="Your Message Here" name="grievance"
                     onChange={handleInputs} value={userData.grievance}></textarea>
                  </div>
                  
                  <div>
                    <p>Upload Supporting Document Here:</p>
                    <input type="file" id="myFile" name="filename" />
                  </div>
<br />
                  <div className="contact_form_button">
                    <button type="submit" className="btn btn-outline-primary"
                    onClick={fileGrievance}>Submit Grievance</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
  )
}

export default Grievance;