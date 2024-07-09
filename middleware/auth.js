import jwt from "jsonwebtoken";

const authMiddeware = async(req,res,next) => {
  const {token} = req.headers;
  console.log(req.headers.token)
  if(!token){
    return res.json({success:false, message:'Not Authorized Login Again'})
  }
  try {
    const tokenDecod = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecod.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success:false, message:'Error'})
  }
}

export default authMiddeware;