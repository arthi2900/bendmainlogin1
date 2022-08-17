import express, { Router } from "express";
const router=express.Router();
import {client} from "./index.js";
import { ObjectId } from "mongodb";
import jwt  from "jsonwebtoken";
import {auth} from "./auth.js";

router.get("/",auth,async function(req,res){
    const result =await client.db("Todo").collection("user")
      .findOne({ })
        res.send(result);
  })


  router.get("/:id",auth,async function(req,res){
    const {id}=req.params;
    const result =await client.db("Todo").collection("user")
    .findOne({_id:ObjectId(id)});
    res.send(result);
})



export const UserRouter=router;

