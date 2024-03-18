//create common api
const exp=require('express')
const commonApp=exp.Router();

commonApp.get('/test-common',(req,res)=>{
    res.send({message:"reply from common app"})
})

module.exports=commonApp;