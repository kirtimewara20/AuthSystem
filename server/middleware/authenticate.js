const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()
const key = process.env.JWT_SECRET;

const authenticate =async(req ,res , next) =>{
    try {
         const token = req.headers.authorization;
      
         const verifyToken = jwt.verify(token , key);
         const ExistingUser = await User.findOne({_id:verifyToken.id})
        //  console.log(ExistingUser)
         if(!ExistingUser){
            throw new Error("User Not Found");
         }

         req.token = token
         req.ExistingUser = ExistingUser
         req.UserId = ExistingUser._id
         next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while middleware"
        })
    }
}

module.exports = authenticate