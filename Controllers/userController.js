const Users = require('./../Model/userModel');
const multer = require('multer');
const sharp=require('sharp')
const multarStorage=multer.memoryStorage();
const multarFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Invalid File'))
    }
}
const upload = multer(
    { storage: multarStorage },
    { fileFilter: multarFileFilter }
)
exports.uploadUserPhotos = upload.single('photo')
exports.resizeUserPhoto=async(req,res,next)=>{
    if(!req.file){
        res.status(400).json({
            status:'failed',
            message:'no file found' 
        })
    }
    req.file.filename=`user-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/users/${req.file.filename}`)
    next()
}
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find({});
        if (!users) {
            res.status(400).json({
                status: 'failed',
                message: 'Something went wrong while fetching users'
            })
        }
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        })
    }
    next()
}
exports.deleteMe = async (req, res, next) => {
    try {
        const user = await Users.findByIdAndDelete(req.user.id);
        if (!user) {
            res.status().json({
                status: 'failed',
                message: 'Something went wrong while deleting your account'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Account Deleted Successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error'
        })
    }
    next();
}
exports.updateMe = async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        res.status(400).json({
            status: 'failed',
            message: 'You cant update password if you want to update password please go to forget password'
        })
    }
    try {
        const user = await Users.findByIdAndUpdate(req.user.id, req.body);
        if (!user) {
            res.status().json({
                status: 'failed',
                message: 'Something went wrong while deleting your account'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'credentials updated successfully'
        })
    } catch (err) {
        console.log(err)
    }
    next()
}