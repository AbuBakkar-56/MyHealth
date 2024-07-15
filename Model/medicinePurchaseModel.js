const mongoose=require('mongoose');
const purchaseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        minLength:11,
        maxLength:11
    },
    Address:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    medicine:{
        type:mongoose.Schema.ObjectId,
        ref:"medicine"      
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
purchaseSchema.virtual('details',{
    ref:"medicine",
    localField:"medicine",
    foreignField:"_id"
})
const purchase=new mongoose.model('purchase',purchaseSchema);
module.exports=purchase