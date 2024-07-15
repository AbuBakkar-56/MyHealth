const mongoose=require('mongoose');
const BlogReview= require('./../Model/blogReview');
exports.getUserBlogIds=(req,res,next)=>{
    if(!req.body.user){
        req.body.user=req.user.id
    }else if(!req.body.blog){
        req.body.blog=req.params.id
    }
    next()
}
// ///
exports.createReview = async (req, res, next) => {
    try {
        const blogreviews = await BlogReview.create(req.body);
        console.log(blogreviews)
        if (!blogreviews) {
            return res.status(400).json({
                status: 'error',
                message: 'Unable to create review'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'review created successfully',
            data: { blogreviews }
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
        const updateBlogreviews = await BlogReview.findByIdAndUpdate(req.params.id);
        if (!updateBlogreviews) {
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
        const deleteBlogReview = await BlogReview.findByIdAndDelete(req.params.id)
        if (!deleteBlogReview) {
            res.status(404).json({
                status: 'failed',
                message: 'Review not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Review delete successfully',
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
    next()
}
exports.getAllReviews = async (req, res, next) => {
    try {
        const getAllReviews = await BlogReview.find({})
        if (!getAllReviews) {
            res.status(400).json({
                status: 'failed',
                message: 'Error while fetching reviews'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Reviews fetched successfully',
            data: { getAllReviews }
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
    const review=await BlogReview.findById(req.params.id);
    if(!review){
        res.status(400).json({
            status:'failed',
            message:'Error while loading review'
        })
    }
    res.status(200).json({
        status:'success',
        message:'Review loaded'
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
// ///
