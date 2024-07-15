const doctorApplication=require('./../Model/doctorapplicationModel');
exports.createDoctorApplication=async(req,res,next)=>{
    try{
        const doctorapplication=await doctorApplication.create(req.body);
        if(!doctorapplication){
            res.status(400).json({
                status:'failed',
                message:'Error while creating'
            })
        }
        res.status(200).json({
            status:'success',
            message:'Application Created Successfully',
            data:{
                doctorapplication
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'failed',
            message:err.message
        })
    }
    next()
}