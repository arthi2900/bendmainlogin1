import express from "express";
import {MongoClient} from"mongodb";
import cors from"cors";
import dotenv from "dotenv";
import {AuthRouter} from "./AuthRouter.js";
import { UserRouter } from "./User.js";
dotenv.config();
const Mongo_url=process.env.Mongo_url;
const PORT=process.env.PORT || 8000;
export const app=express();
app.use (express.json());
app.use(
    cors({
      origin: "*",
    })
  );
async function createConnection(){
    const client=new MongoClient(Mongo_url);
    await client.connect();
    console.log("I connect successfull");
    return client;
    }
    export const client=await createConnection();
    app.use("/auth",AuthRouter);
    app.use("/user",UserRouter);
        app.listen(PORT,function(){
        console.log(`successful start from connect ${PORT}`);
    })