const exp=require('express')
const app=exp()
const mongoClient=require('mongodb').MongoClient;
require('dotenv').config()//process.env.PORT

//to parse the body of req
app.use(exp.json())

//to secure data 
//connect to db
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const blogdb=client.db('blogdb')
    //get collection object
    const userscollections=blogdb.collection('userscollections')
    app.set('userscollections',userscollections)
    //confirm db connection status
    console.log("DB connection success")


})
.catch(err=>{console.log("Err in DB connection",err)})
const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')
//middleware
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//express error handle
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err})
})


const port=process.env.PORT||5000;
//assign port number

app.listen(port,()=>console.log('web server on port ${port}'))