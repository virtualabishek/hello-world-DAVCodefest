export const generateVerificationCOde=()=>{

    return Math.floor(100000+Math.random()*900000).toString()

}
 import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", 
    });

    res.cookie("token", token, {
      httpOnly: true, 
      secure: false,  
      sameSite: "lax",  
      maxAge: 7 * 24 * 60 * 60 * 1000,  
    });
console.log("Token generated and cookie set successfully",token );
    return token;

  } catch (error) {
    console.error("Error generating token and setting cookie:", error);
    throw new Error("Failed to generate token");
  }
};