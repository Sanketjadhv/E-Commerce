import jwt from "jsonwebtoken"
export const gentoken =  (userId) =>{
     try{
        let token =  jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d"})
        console.log("JWT_SECRET", process.env.JWT_SECRET);
        console.log("UserId for token", userId);
        return token
     }catch(error){
        console.log("token error")
     }
}

export const gentoken1 =  (email) =>{
     try{
        let token =  jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:"7d"})
        console.log("JWT_SECRET", process.env.JWT_SECRET);
        console.log("email for token", email);
        return token
     }catch(error){
        console.log("token error")
     }
}