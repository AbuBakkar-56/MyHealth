const mongoose=require('mongoose');
const medicineSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    picture:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
const medicine=new mongoose.model('medicine',medicineSchema);
module.exports=medicine