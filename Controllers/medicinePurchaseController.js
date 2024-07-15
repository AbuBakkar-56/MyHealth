const Purchase = require('./../Model/medicinePurchaseModel');
exports.getMedicineId = async (req, res, next) => {
    if (!req.body.medicine) {
        req.body.medicine = req.params.id
    }
    next()
}
exports.purchaseMedicine=async(req,res,next)=>{
    try{
        const purachase=await Purchase.create(req.body)
        if(!purachase){
            return res.status(400).json(
                {
                    status:'failed',
                    message:'Error While purchasing'
                }
            )
        }
        res.status(201).json(
            {
                status:'success',
                message:'purchase successfull'
            }
        )
    }catch(err){
        console.log(err)
        res.status(500).json({
            status:'failed',
            message:err.message,

        })
    }
} 
exports.populatePuchase=async(req,res,next)=>{
    try{
        const purchaseDetails=await Purchase.find().populate('details');
        if(!purchaseDetails){
            res.status(400).json({
                status:'failed',
                message:'Error While fetching products'
            })
        }
        res.status(200).json({
            status:'success',
            message:"Fetched Successfully",
            data:{
                purchaseDetails
            }
        })
    }catch(err){
        res.status(500).json(
            {
                status:'failed',
                message:err.message
            }
        )
    }
}