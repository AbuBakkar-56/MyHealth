const Doctors=require('./../Model/doctorModel')
const Users=require('./../Model/userModel')
const Medicine=require('./../Model/medicineModel')
const Blogs =require('./../Model/blogModel');
const Reviews=require('./../Model/reviewModel');
const Orders=require('./../Model/medicineModel');
const Bookings=require('./../Model/bookingModel');
exports.getDoctorLogin=async(req,res)=>{
    res.status(200).render('login',{
        title:"Doctor Login",
        hideHeader: true,
        hideFooter: true
    })
}
exports.getAdminLogin=async(req,res)=>{
    res.status(200).render('login',{
        title:'Admin Login',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getDoctorDashboard=async(req,res)=>{
    res.status(200).render('doctordashboard',{
        title:'Doctors Dashboard',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getDoctorInfo=async(req,res)=>{
    res.status(200).render('Doctorinfo',{
        title:'Doctor Info',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getDoctorBookings=async(req,res)=>{
    res.status(200).render('booking',{
        title:'Doctor Bookings',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getAddBlog=async(req,res)=>{
    res.status(200).render('addblog',{
        title:'Add Blog',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getBookinsPage= async (req, res, next) => {
    const doctorId = req.query.doctorId;

    if (!doctorId) {
        return res.status(400).send('Doctor ID is required to book an appointment');
    }

    try {
        const doctor = await Doctors.findById(doctorId);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }

        const bookings = await Bookings.find({ doctor: doctorId, status: 'PENDING'});

        console.log("Bookings: ", bookings)

        const availableSlots = doctor.availbleSlots.map(slot => ({
            slot: slot,
            booked: bookings.some(booking => booking.bookingTime === slot) 
        }));

        console.log("Available Slots: ", availableSlots);

        res.render('doctorbookings', {
            doctorId,
            availabilityDays: doctor.AvailabilityDays,
            availableSlots: availableSlots,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};
exports.getAddPatientHistory=async(req,res)=>{
    res.status(200).render('patienthistory',{
        title:'Patient History',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getSignUp=async(req,res,next)=>{
    res.status(200).render('signup',{
        title:'SignUp'
    })
    next()
}
exports.getOverView = async(req, res,next) => {
    const doctors=await Doctors.find({})
    res.status(200).render('overview', {
        title: 'overview page',
        doctors
    })
    next()
}
exports.getMedicine=async(req,res,next)=>{
   const medicines=await Medicine.find({})
   res.status(200).render('medicine',{
    title:'Medicine Page',
    medicines
   })
   next()
}
exports.getMedicineDetails=async(req,res,next)=>{
    const medicine=await Medicine.findById(req.params.id)
    return res.status(200).render('medicines',{
        title:'Medicine Details',
        medicine
    })
    next()
}
exports.getDoctor = async(req, res,next) => {
    const doctor=await Doctors.findById(req.params.id).populate('reviews')
    res.status(200).render('doctor', {
        title: 'doctor',
        doctor
    })
    next()
}
exports.getBlogsDetails = async (req, res, next) => {
    try {
        const blog = await Blogs.findById(req.params.id)
        if (!blog) {
            return res.status(404).render('error', {
                title: 'Blog not found',
                message: 'The blog you are looking for does not exist.'
            });
        }
        res.status(200).render('blogdetails', {
            title: 'Blog Details',
            blog
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            title: 'Server Error',
            message: 'An error occurred while retrieving the blog details.'
        });
    }
};
exports.getLoginForm=async(req,res,next)=>{
    try{
        res.status(200).render('login',{
            title:'Login'
        })
    }catch(err){
        console.log(err)
    }
}
exports.getAccount = async (req, res) => {
    res.status(200).render('account', {
        title: 'Account'
    });
};
exports.getBlogs=async(req,res,next)=>{
   const blogs=await Blogs.find({})
   res.status(200).render('blogs',{
    title:'Blogs',
    blogs
   })
    next()
}
exports.getAdmin=async(req,res)=>{
    res.status(200).render('admin',{
        title:'Admin',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getDoctorReviews=async(req,res,next)=>{
    const reviews=await Reviews.find({})
    console.log(reviews.user)
    res.status(200).render('doctorreviews',{
        title: 'Doctor Review',
        reviews,
        hideHeader: true,
        hideFooter: true
    })
    next()
}
exports.getAddMedicinePage=async(req,res)=>{
    res.status(200).render('addmedicine',{
        title:'Add Medicine Page',
        hideHeader: true,
        hideFooter: true
    })
}
exports.getOrders=async(req,res)=>{
    const orders=await Orders.find()
    return res.status(200).render('vieworders',{
        titile:'Order Page',
        orders,
        hideHeader: true,
        hideFooter: true
    })
}
exports.getManageDoctors=async(req,res)=>{
    res.status(200).render('managedoctor',{
        title:'Manage Doctor',
        hideHeader: true,
        hideFooter: true
    })
}
exports.updateSettings=async(req,res,next)=>{
    try{ 
        if(req.file){
            console.log('File uploaded:', req.file);
            req.body.photo=req.file.filename
            console.log(req.body.photo)
        }
     const user=await Users.findByIdAndUpdate(req.user.id,{
        name:req.body.name,
        email:req.body.email
     },
     {
        new:true,
        runValidators: true
     }
    )
    console.log("users",user)
     res.status(200).json(
        {
            status:'success',
            message:'data updated...',
            data:{user}
        }
     )
    }catch(err){
        console.log(err)
    }
}
exports.getSearchResults = async (req, res, next) => {
    try {
        const { city, specialization } = req.query;

        const doctors = await Doctors.find({
            Cities: city,
            Specialization: specialization
        });

        res.status(200).render('searchResults', {
            title: 'Search Results',
            doctors
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            title: 'Server Error',
            message: 'An error occurred while retrieving search results.'
        });
    }
};
// Add these two new exports for rendering the views
exports.getForgotPasswordForm = async (req, res) => {
    res.status(200).render('forgotPassword', {
        title: 'Forgot Password'
    });
};

exports.getResetPasswordForm = async (req, res) => {
    const { token } = req.params;
    res.status(200).render('resetPassword', {
        title: 'Reset Password',
        token
    });
};
exports.getDoctorApplicationForm=async(req,res)=>{
    res.status(200).render('doctorapplication',{
        title:'Doctor Application'
    })
}