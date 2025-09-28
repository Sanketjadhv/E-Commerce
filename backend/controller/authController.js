import User from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { gentoken, gentoken1 } from "../config/token.js";

export const registration = async (req,res) =>{
    try{
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            msg:"User already exist"
        })
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            msg:"Enter valid email"
        })
    }
    if(password.length < 8){
         return res.status(400).json({
            msg:"Enter strong password"
        })
    }
    let hashPassword = await bcrypt.hash(password,10)

    const user = await User.create({name,email,password:hashPassword})

    let token = await gentoken(user._id)

    res.cookie("token",token,{
       httpOnly:true,
       secure:true,
       sameSite:"none",
       maxAge: 7 * 24 * 60 * 1000 
    })
    return res.status(201).json(user)
    }catch(error){
        console.log("signUp error")
        return res.status(500).json({
            msg:`registration error ${error}`
        })
    }

}


export const login = async (req,res) => {
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Incorrect password"})
        }
         let token = await gentoken(user._id)

            res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 1000 
            })
            return res.status(201).json(
                {
                    message:"Login successful",
                    data:user
                })
            }
    catch(error){
        return res.status(500).json({message:`login error ${error}`})
    }
}

export const logout = async(req,res)=>{
try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({message:"logout successful"})
}
catch(error){
    return res.status(500).json({message:`logout error${error}`})

}
}

export const googleLogin = async(req,res) =>{
    try{
        let {name, email} = req.body;
        let user = await User.findOne({email})
        if(!user){
         user = await User.create({
            name,email
        })
        }
         let token = await gentoken(user._id)

            res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 1000 
            })
            return res.status(200).json(
                {
                    message:"successful",
                    data:user
                })

    }catch(error){
            console.log("google login error")
            return res.status(500).json({message:`Google login error ${error}`})
    }
}

export const adminLogin = async (req, res) =>{
    try{
        let {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        let token = await gentoken1(email)

            res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 1 * 24 * 60 * 60 * 1000 
            })
            return res.status(200).json(
                {
                    message:"successful",
                    data:token
                })
            }
            return res.status(400).json({message:"Invalid Credentials"})

    }catch(error){
            console.log("Admin login error")
            return res.status(500).json({message:`Admin login error ${error}`})
    }
}
