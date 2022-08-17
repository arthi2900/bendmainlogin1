import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {auth} from './auth.js';
import { ObjectId } from "mongodb";

async function genPassword(password){
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);
  //  console.log({salt,hashpassword});
    return hashpassword;
    }
router.post("/register",async function (req,res){
    const {username,password,email}=req.body;
    const hashpassword=await genPassword(password);
    const newUser={
        username:username,email:email,password:hashpassword,
    }
const result=await client.db("Todo").collection("user")
.insertOne(newUser);
res.send(result);
   })
router.post("/login",async function(req,res){
    const{username,password}=req.body;
      const userfromdb=await client.db("Todo").collection("user").findOne({username:username});
        console.log(userfromdb);
    if(!userfromdb) 
    {
        res.status(401).send({message:"invalid credentials"});
       }
   else {
    const storedPassword=userfromdb.password;
    const isPasswordMatch=await bcrypt.compare(password,storedPassword);
    console.log("isPasswordMatch",isPasswordMatch);
if(isPasswordMatch){
const token=jwt.sign({id:userfromdb._id},process.env.SECRET_KEY);
const user=username;
res.send({message:"successful login",token:token,user:user,id:id});
}
else{
res.status(401).send({message:"Invalid credenitials"});
}
   }
 })
 /*
router.get("/user", async function (req, res) {
    const result =await client.db("Todo").collection("user")
    .find({}).toArray();
    res.send(result);

});
*/
router.get("/:id",async function (req, res) {
    const {id}=req.params;
    const result =await client.db("Todo").collection("user")
    .findOne({_id:ObjectId(id)});
    res.send(result);

});
router.delete("/:id",async function  (req, res) {
   const {id}=req.params;
   const result =await client.db("Todo").collection("user")
   .deleteOne({_id:ObjectId(id)});
   res.send(result);
  
    
    
});
export const AuthRouter=router;