const Users = require('./../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Doctors=require('./../Model/doctorModel');
const sendEmail=require('./../utils/Email')
const { LEGAL_TLS_SOCKET_OPTIONS } = require('mongodb');
//user authentication and authorization system
exports.signUp = async (req, res, next) => {
    try {
        const user = await Users.create(req.body); // Changed variable name from 'users' to 'user'
        const token = jwt.sign({ id: user._id }, 'my-ultra-secure-protected-key-forjwt-token', { expiresIn: '90d' });

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Something went wrong'
            })
        }
        return res.status(201).json({
            status: 'success',
            message: 'User signup successful',
            token,
            data: { user }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'failed',
            error: err.message // Sending only the error message to the client
        });
    }
};
exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide email and password'
            });
        }

        const user = await Users.findOne({ email }).select('+password')
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found',
            });
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid email or password',
            });
        }

        const token = jwt.sign({ id: user._id }, 'my-ultra-secure-protected-key-forjwt-token', { expiresIn: '90d' });

        // Set the JWT token as a cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days in milliseconds
        });

        return res.status(200).json({
            token,
            status: 'success',
            message: 'User login successful',
            role: user.role
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'failed',
            error: 'Internal server error',
        });
    }
};

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
        token=req.cookies.jwt
        // console.log(token)
    }

    try {
        const decode = jwt.verify(token, 'my-ultra-secure-protected-key-forjwt-token');
        // console.log(decode);

        if (!decode) {
            return res.status(400).json({
                status: 'failed',
                message: 'This Route is protected, please login to get access'
            });
        }

        const currentUser = await Users.findById(decode.id);
        if (!currentUser) {
            return res.status(404).json({
                status: 'failed',
                message: 'User does not exist'
            });
        }
        if (currentUser.passwordChangedAt && currentUser.iat < currentUser.passwordChangedAt.getTime()) {
            return res.status(401).json({
                status: 'failed',
                message: 'Password has been changed since the issuance of the token. Please reauthenticate.'
            });
        }
        res.locals.user=currentUser
        // console.log("user:",res.locals.user)
        req.user = currentUser;
        console.log(req.user)
        // console.log("user:", req.user)
        // If everything is fine, move to the next middleware
        next();
    } catch (error) {
        console.log(error)
        // If token verification fails
        return res.status(401).json({
            status: 'failed',
            message: 'Invalid token'
        });
    }
};
exports.isLoggedIn=async(req,res,next)=>{
    try{
        if(req.cookies.jwt){
            const decode=jwt.verify(req.cookies.jwt,'my-ultra-secure-protected-key-forjwt-token');
            if(!decode){
                res.status(401).json({
                    status:'failed',
                    message:'invalid token'
                })
            }
        const currentUser=await Users.findById(decode.id);
        if(!currentUser){
            res.status(404).json(
                {
                    status:'failed',
                    message:'User not exists'
                }
            )
        }
        if(currentUser.passwordChangedAt && currentUser.iat<currentUser.passwordChangedAt.getTime()){
            res.status(403).json({
                status:'failed',
                message:'Your password has changed pleases login again'
            })
        }
        res.locals.user=currentUser
        req.user=currentUser
        }
        next()
    }catch(err){
       console.log(err)
       res.status(500).json(
        {
            status:'failed',
            message:'Internal Server Error'
        })
    }
}
exports.restictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).render('error', {
                title: 'Access Denied',
                message: 'You are not allowed to access this Resource'
            });
        }
        next();
    };
};
exports.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide your email address'
            });
        }
        const findUser = await Users.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                status: 'failed',
                message: 'User with this email does not exist'
            });
        }

        const resetToken = await findUser.generateResetToken();
        await findUser.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        console.log(resetUrl); // For testing purposes, log the URL

        try {
            const message = `Forget your password? Submit a PATCH request with your new password to the following URL: ${resetUrl}\nIf you didn't forget your password, please ignore this email.`;
            await sendEmail({
                email: findUser.email,
                subject: 'Your password reset token (valid for 10 minutes)',
                message,
            });

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!',
                resetUrl // Send the reset URL for testing
            });
        } catch (err) {
            findUser.resetToken = undefined;
            findUser.tokenExpiresIn = undefined;
            await findUser.save({ validateBeforeSave: false });

            res.status(500).json({
                status: 'failed',
                message: 'There was an error sending the email. Try again later.',
                error: err
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
            error: err
        });
    }
};

// Reset the password using the token
exports.resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;
        console.log('Received reset token:', resetToken);

        if (!resetToken) {
            return res.status(400).json({
                status: 'failed',
                message: 'Reset token is missing'
            });
        }

        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        console.log('Hashed token:', hashedToken);

        const confirmUser = await Users.findOne({
            resetToken: hashedToken,
            tokenExpiresIn: { $gt: Date.now() }
        });

        if (!confirmUser) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid or expired reset token'
            });
        }

        confirmUser.password = req.body.password;
        confirmUser.confirmPassword = req.body.confirmPassword;
        confirmUser.resetToken = undefined;
        confirmUser.tokenExpiresIn = undefined;

        await confirmUser.save();

        const token = jwt.sign({ id: confirmUser.id }, 'my-ultra-secure-protected-key-forjwt-token', { expiresIn: '1h' });

        res.status(200).json({
            token,
            status: 'success',
            message: 'Password updated successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

exports.updatePassword = async (req, res, next) => {
    const { currentPassword } = req.body;
    try {
        const user = await Users.findById(req.user.id)
        const comparePass = await bcrypt.compare(currentPassword, user.password);
        if (!comparePass) {
           return res.status(404).json({
                status: 'failed',
                message: 'User with this password not exists'
            })
        }
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        await user.save();
        const token = jwt.sign({ id: user._id }, 'my-ultra-secure-protected-key-forjwt-token', { expiresIn: '90d' })
        res.status(200).json({
            status: 'success',
            message: 'Password Updated Successfully'
        })
    } catch (err) {
        console.log(err)
    }
}
