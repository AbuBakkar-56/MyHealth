const mongoose=require('mongoose');
const prescriptionSchema=new mongoose.Schema({
    patientName:{
        type:String,
        require:true
    },
    patientCnic:{
        type:Number,
        require:true,
        unique:[true,'Patient with this CNIC already exisits']
    },
    prescription:{
        type:String,
        required:true
    }
})
const prescriptionModel=new mongoose.model('patientPrescription',prescriptionSchema);
module.exports=prescriptionModel