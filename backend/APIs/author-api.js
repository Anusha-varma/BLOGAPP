//create author api
const exp=require('express')
const authorApp=exp.Router();

authorApp.get('/test-author',(req,res)=>{
    res.send({message:"This is from author api"})
})
//export authorApp
module.exports=authorApp;