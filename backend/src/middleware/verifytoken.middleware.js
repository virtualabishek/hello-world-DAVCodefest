import jwt from "jsonwebtoken"

 export const verifyToken=(req,res,next)=>{
     const token = req.cookies.token
     console.log("token",token)

    if(!token){
        return res.status(400).json({success:false,message:"token didnot found"})
    }


    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({success:false,message:"unsucessful"})
        }
        // console.log("decoded",decoded)
        req.userId = decoded.userId
        console.log("req.userId ",req.userId)
        next()

    
    
    
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
 }