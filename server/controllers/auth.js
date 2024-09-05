const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.signup = async(req ,res) =>{
try {
  
      const {name , email , password , confirmPassword} = req.body;
      
     if(!name || !email || !password || !confirmPassword){
        console.log(message)
            return res.status(400).json({
                success:false , 
                message:"Fill all details successfully"
            })
            
     }

     const emailAlreadyExist = await User.findOne({email})
    if(emailAlreadyExist){
        return res.status(400).json({
            success:false,
            message:"Email Already Exist"
        })
       
    }

    let hashedPassword 
    try {

        hashedPassword = await bcrypt.hash(password , 10);

    } catch (error) {
        return res.status(500).json({
            success:false , 
            message:"Error in hashing password"
        })
    }

    console.log(hashedPassword) 
    const newUser = new User({
        name ,
         email ,
         password:hashedPassword ,
          confirmPassword:hashedPassword
    })

    const user = await newUser.save();
     console.log(user)
    return res.status(200).json( {status:200,
        success:true,
        message:"User Created Successfully " ,
        
    })


} catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:error
    })
}

}


exports.login = async(req , res) =>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Enter Email and password"
            })
        }
         
        let user = await User.findOne({email})
       
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            })
        }

      const payload = {
        email:user.email ,
        id:user._id,
      }
    
      if(await bcrypt.compare(password ,user.password)){
        console.log(bcrypt.compare(password ,user.password))
           let token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn: "2h"
           })

           user = user.toObject()
           user.token = token
           user.password = undefined

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly:true,
      }

      res.cookie("token" , token , options).status(200).json({
        status:200,
        success:true,
        token , user,
        message:"User Login Successfully"
      })

      console.log(user)
      


    }else {
       return res.status(403).json({
            success:false,
            message:"password does not matched"
        })

    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error"
        })
    }
 }

 exports.authenticate = async(req ,res , next) =>{
    try {
        const validUserOne = await User.findOne({id:req._id})
       return res.status(200).json({status:200 , validUserOne})
        console.log(validUserOne)
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error in authenticating user"
        })
    }
 }




 
 


