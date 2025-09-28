import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) =>{

  try{  
   let token = req.cookies?.token 
   if(!token){
    return res.status(400).json({
        message:"Not authorised Login Again"
    })
   }
   let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

   if(!verifyToken){
    return res.status(400).json({
        message:"Not authorised Login Again , Invalid Token"
    })
   }
   
   req.adminEmail = process.env.ADMIN_EMAIL

   next();
  }
  catch(error){
    console.log("error")
            return res.status(500).json({
                message:`AdminAuth error ${error}`
            })
  }
}

export default adminAuth