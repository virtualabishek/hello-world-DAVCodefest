export const generateVerificationCOde=()=>{

    return Math.floor(100000+Math.random()*900000).toString()

}
 import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res, userId) => {
  try {
   
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",  // Token expires in 7 days
    });

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,   // Cannot be accessed via JavaScript
      secure: false,  // Set to true in production (for HTTPS)
      sameSite: "lax",  // Protects against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
    });
console.log("Token generated and cookie set successfully",token );
    // Return the token string, not a Promise
    return token;

  } catch (error) {
    console.error("Error generating token and setting cookie:", error);
    throw new Error("Failed to generate token");
  }
};