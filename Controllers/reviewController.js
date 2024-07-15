const Review = require('./../Model/reviewModel');
exports.getUserDoctorIds = (req, res, next) => {
    if (!req.body.doctor) {
        req.body.doctor = req.params.doctorId
        console.log(req.params.doctorId)
    }
    if (!req.body.user) {
        req.body.user = req.user.id
        console.log(req.user.id)
    }
    next()
}
exports.createReview = async (req, res, next) => {
    try {
        const reviews = await Review.create(req.body);
        console.log(reviews)
        if (!reviews) {
            return res.status(400).json({
                status: 'error',
                message: 'Unable to create review'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'review created successfully',
            data: { reviews }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'Internal Server error'
        })
    }
}
exports.updateReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id);
        if (!review) {
            res.status(404).json({
                status: 'failed',
                message: 'Error while updating review'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Review updated successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        })
    }
    next()
}

exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                status: 'failed',
                message: 'Review not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Review deleted successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
};

exports.getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({})
        if (!reviews) {
            res.status(400).json({
                status: 'failed',
                message: 'Error while fetching reviews'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Reviews fetched successfully',
            data: { reviews }
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        })
    }
    next()
}
exports.getReview=async(req,res,next)=>{
    try{
        const review=await Review.findById(req.params.id)
        if(!review){
            res.status(404).json({
                status:'failed',
                message:'review not found'
            }
            )
        }
        res.status(200).json({
            status:'success',
            message:'Review loaded successfully',
            data:{review}
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:'Internal Server error'
        })
    }
    next()
}