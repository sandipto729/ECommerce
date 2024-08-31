const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String
    },
    role:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.model('user',userSchema)