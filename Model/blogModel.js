const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:new Date()
    },
    author:{
        type:String
    },
    ratingsAvg:{
        type:Number,
        min:1,
        max:5
    },
    ratingsQuantity:{
      type:Number,
      default:0
    },
    Content:{
        type:String,
        required:true,

    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)
blogSchema.virtual('review', {
    ref: "blogreview",
    localField: "_id",
    foreignField: "blog"
});

const blog=new mongoose.model('blog',blogSchema);
module.exports=blog