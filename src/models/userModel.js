import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true,       
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
    },
    isVerified:{ // this is for email verification
        type:Boolean,
        default:false
    },
    idAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users',userSchema); // if users collection already exists then use it else create a new collection with name users
// models
export default User;