const Medicine=require('./../Model/medicineModel');
const mongoose=require('mongoose');
exports.createMedicine = async (req, res, next) => {
    try {
      const medicine = await Medicine.create(req.body);
      if (!medicine) {
        return res.status(400).json({
          status: 'failed',
          message: 'Error while creating medicine'
        });
      }
      res.status(201).json({
        status: 'success',
        message: 'Created Successfully',
        data: { medicine }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
        error: error.message
      });
    }
  };
    
  exports.updateMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body);
        if (!medicine) {
            return res.status(404).json({
                status: 'error',
                message: 'Medicine not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Medicine updated successfully',
            data: {
               medicine
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: err.message
        });
    }
};
exports.deleteMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) {
            return res.status(404).json({
                status: 'error',
                message: 'Medicine not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Medicine deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: err.message
        });
    }
};
exports.getAllMedicines=async(req,res,next)=>{
    try{
    const medicines=await Medicine.find({})
    if(!medicines){
        return res.status(404).json({
            status:'failed',
            message:"Error while fetching medicines"
        })
    }
    res.status(201).json({
        status:'success',
        message:'fetched successfully',
        data:{medicines}
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: err.message
        });
    }
}
exports.getMedicine = async (req, res, next) => {
    try {
        const medicine= await Medicine.findById(req.params.id);
        if (!medicine) {
            return res.status(404).json({
                status: 'error',
                message: 'Medicine not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            data: {
                medicine,
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: err.message
        });
    }
};