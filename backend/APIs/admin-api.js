//create admin api
const exp=require('express')
const adminApp=exp.Router();

adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"This is from author api"})
})
//export adminApp
module.exports=adminApp;