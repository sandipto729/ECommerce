const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
     productId:String,
     quantity:Number,
     userId:String
},{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.model('cartProduct',productSchema)
