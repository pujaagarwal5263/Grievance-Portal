const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique:[true,"Email ID already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("INVALID EMAIL");
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        //minlength:10,
        //maxlength:10,
        required: true,
        //unique: true
    },
    address:{
        type: String,
        required: true
    },
    grievances:[
    {   
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        dept:{
            type:String,
            required:true
        },
        grievance:{
        type:String,
        required:true
        },
        status:{
            type:String,
            default:"Not seen"
        },
        feedback:{
            type:String,
            default:"NA"
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
    ],
    
    tokens:[
        {
            token:{
            type:String,
            required:true
            }
        }
        ],
})

//we are hashing the password
//we are trying to call a pre() method which will be functioning before the save() method
userSchema.pre('save',async function(next){
    //we did not use fat arrow because "this" keyword does not work with it
    if(this.isModified('password')){
       this.password=await bcrypt.hash(this.password,10);
       this.cpassword=await bcrypt.hash(this.cpassword,10);     
    }
    next();
 })

 //generateAuthToken function--> to generate token
userSchema.methods.generateAuthToken= async function(){
    try{
        //jwt.sign(payload,SECRET_KEY)
      const token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
    }catch(err){
        console.log(err);
    }
}

//store the grievance
userSchema.methods.addGrievance=async function(name,email,phone,dept,grievance){
    try{
      this.grievances=this.grievances.concat({name,email,phone,dept,grievance});
      await this.save();
      return this.messages;
    }catch(err){
        console.log(err);
    }
}

//creating a collection
const User= new mongoose.model('User',userSchema);

module.exports=User;