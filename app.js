const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRoute = require('./Routes/userRoute');
const prescriptionRoute = require('./Routes/prescriptionRoute')
const doctorRoute = require('./Routes/doctorRoute');
const reviewRoute = require('./Routes/reviewRoute');
const viewRoute = require('./Routes/viewRoute');
const medicineRoute = require('./Routes/medicineRoute')
const medicinePurchaseRoute = require('./Routes/medicinePurchseRoute')
const blogsRoute = require('./Routes/blogsRoute')
const bookingRoute = require('./Routes/bookingRoute')
const doctorApplicationRoute = require('./Routes/doctorApplicationRoute')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views')
app.locals.basedir = path.join(__dirname, 'views');
app.use((req, res, next) => {
    res.locals.currentPage = req.path; // Sets currentPage to the current request path
    next();
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// Connect to MongoDB
const dbPassword = 'isdf7890';
const dbName = 'myHealthfinal-v';
const uri = `mongodb+srv://abu246756:${dbPassword}@cluster3.lepza1k.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster3`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(uri, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(cookieParser())
// Routes
// app.use((req,res,next)=>{
//     console.log(req.cookies)
//     next()
// })
app.use(cors())
app.use('/', viewRoute)
app.use('/api/finalv/users', userRoute);
app.use('/api/finalv/doctors', doctorRoute);
app.use('/api/finalv/reviews', reviewRoute)
app.use('/api/finalv/medicine', medicineRoute)
app.use('/api/finalv/medicinePurchase', medicinePurchaseRoute)
app.use('/api/finalv/blogs', blogsRoute);
app.use('/api/finalv/bookings', bookingRoute)
app.use('/api/finalv/doctorapplication', doctorApplicationRoute)
app.use('/api/finalv/prescription', prescriptionRoute)
app.all('*', (req, res, next) => {
    res.status(400).json({
        status: 'failed',
        message: 'Invalid Route'
    })
})
//   console.log('capturing error'); // This will now print after middleware setup
const port = 7000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

// $env:NODE_PROD="production"; nodemon app.js
// $env:NODE_PROD="development"; nodemon app.js