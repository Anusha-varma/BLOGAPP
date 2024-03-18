//create user api
const exp=require('express');
const userApp=exp.Router();
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
//const commonApp=require('./common-api')
let userscollections;
//get usercollection app
userApp.use((req,res,next)=>{
    userscollections=req.app.get('userscollections')
    next()
})

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body;
    //check for the duplicate user based on username
    const dbUser=await userscollections.findOne({username:newUser.username})
    //if user found in db
    if(dbUser!==null)
    res.send({message:"Username is already existed"})
else{
    //hash password
    const hashedPassword=await bcryptjs.hash(newUser.password,6)
    //replace plain password with hashed
    newUser.password=hashedPassword;
    //create user
    await userscollections.insertOne(newUser);
    res.send({message:"User created"})
}
}))

//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client
    const userCred=req.body;
    //check for username
    const dbUser=await userscollections.findOne({username:userCred.username})
    if(dbUser===null)
     res.send({message:"Invalid username"})
    else{
        //check for password
        const status=await bcryptjs.compare(userCred.password,dbUser.password)
        if(status===false)
        res.send({message:"Invalid password"})
    else{
        //create jwt token and encode it
        const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:100})
        //send res
        res.send({message:"Login Success",token:signedToken,user:dbUser})
    }
    }
}))

//export userApp
module.exports=userApp;