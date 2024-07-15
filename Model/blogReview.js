const mongoose = require('mongoose');
const Blog=require('./blogModel');
const blogReviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    blog: {
        type: mongoose.Schema.ObjectId,
        ref: 'blog'
    }
})
blogReviewSchema.statics.calcAvgRatings=async function (id){
   const ratings=await this.aggregate([
    {
        $match:{blog:id}
    },
    {
        $group:{
            _id:"$blog",
            nRatings:{$sum:1},
            avgRatings:{$avg:"$rating"}
        }
    }
   ])
   console.log(ratings)
   if(ratings.length>0){
    await Blog.findByIdAndUpdate(id,{
        ratingsQuantity:ratings[0].nRatings,
        ratingsAvg:ratings[0].avgRatings
    })
   }else{
    await Blog.findByIdAndUpdate(id,{
        ratingsQuantity:0,
        ratingsAvg:0
    })
   }
}
blogReviewSchema.post('save',async function(){
    try{
    await this.constructor.calcAvgRatings(this.blog)
    }catch(err){
        console.log(err)
    }
})

const blogreview = new mongoose.model('blogreview', blogReviewSchema);
module.exports = blogreview
