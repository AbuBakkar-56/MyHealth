const Blog = require('./../Model/blogModel');
const mongoose = require('mongoose');
exports.createBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.create(req.body)
        if (!blogs) {
            res.status(400).json({
                status: 'failed',
                message: 'Error while creating blog'
            })
        }
        res.status(201).json({
            status: 'success',
            message: 'Blog Created Successfully',
            data: { blogs }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.updateBlog = async (req, res, next) => {
    try {
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body)
        if (!updateBlog) {
            res.status(400).json({
                status: 'failed',
                message: 'Error while updating blog'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Blog updated'
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        })
    }
}
exports.deleteBlog = async (req, res, next) => {
    try {
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id)
        if (!deleteBlog) {
            res.status(400).json({
                status: 'failed',
                message: 'Error While Delteing blog'
            })
        }
        res.status(200).json({
            status:'success',
            message:'Blog Deleted'
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}
exports.getBlog = async (req, res, next) => {
    try {
        const getBlog = await Blog.findById(req.params.id).populate('review');
        console.log(getBlog);
        if (!getBlog) {
            return res.status(404).json({
                status: 'failed',
                message: 'blog not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Blog fetched',
            data: { getBlog }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }
    next();
};
exports.getAllBlogs = async (req, res, next) => {
    try {
        const allBlogs = await Blog.find()
        if (!allBlogs) {
            res.status(404).json({
                status: 'failed',
                message: 'Blogs not found'
            })
        }
        res.status(200).json({
            status:'success',
            message:'Blogs fetched',
            data:{allBlogs}
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        })
    }
}