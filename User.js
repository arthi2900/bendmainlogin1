import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import { ObjectId } from "mongodb";
import jwt  from "jsonwebtoken";
import {auth} from "./auth.js";

router.get("/",auth,async function(req,res){
  const connection=await client.connect();
  const result =await db("Todo").collection("user")
  .findOne({});
  res.json(result);
  await connection.close()
  })


  router.get("/:id",auth,async function(req,res){
    const {id}=req.params;
    const result =await client.db("Todo").collection("user")
    .findOne({_id:ObjectId(id)});
    res.send(result);
})



export const UserRouter=router;

