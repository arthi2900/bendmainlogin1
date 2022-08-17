import jwt  from "jsonwebtoken";
export const auth=(req,res,next)=>{ 
try{
  const token=req.header("x-auth-token");
    console.log(token);
    const verify=jwt.verify(token,process.env.SECRET_KEY);
       if(verify){
        req.id=verify._id;
        console.log(req.id)
        next();
       }
       else {
        res.status(401).json({ message: "Unauthorized" });
      }
    
}
catch(err){
res.status(401).send({error:err.message});
} 
}