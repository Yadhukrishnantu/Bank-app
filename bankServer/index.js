// import dataservice file 
const dataService = require("./service/dataservice")

// import cors
const cors=require("cors")
 
// import json web token
// const jwt= require('jsonwebtoken')

// import express

const express = require("express")

// create app using express

const app = express()

// connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

// to parse json data from req body
app.use(express.json())

// middleware

    const jwtMiddleware=(req,res,next)=>{
    try{
    const token=req.headers['access_token']
    // verify token 
    const data=jwt.verify(token,"supersecretkey123")
    console.log(data);
    next()
  }
  catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'please login first'
    })

   } 

}


// register - Post

app.post('/register', (req, res) => {
     dataService.register(req.body.uname, req.body.acno, req.body.pasw).then(result=>{
        res.status(result.statusCode).json(result)
    })
    //    convert object to json and send as response
    // console.log(req.body);
    // res.send("success")

})
 
// login
app.post('/login', (req, res) => {
     dataService.login( req.body.acno, req.body.pasw).then(result=>{
        res.status(result.statusCode).json(result)
    })
    
    

    

})


// deposite
app.post('/deposite',jwtMiddleware,(req, res) => {
     dataService.deposite( req.body.acnum, req.body.password,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)

     })
    //    convert object to json and send as response
     
    

})

// withdraw

app.post('/withdraw',jwtMiddleware,(req, res) => {
     dataService.withdraw( req.body.acnum, req.body.password,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
     })
    //    convert object to json and send as response
    

    

})


// get transaction 

app.post('/getTransaction',jwtMiddleware,(req, res) => {
     dataService.getTransaction( req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
     })
    //    convert object to json and send as response
     

    

})
// delete
app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})







// request
// app.get('/',(req,res)=>{
//     res.send('Get Method...')
// })

// app.post('/',(req,res)=>{
//     res.send('post Method...')
// })

// app.put('/',(req,res)=>{
//     res.send('Put Method...')
// })
// app.patch('/',(req,res)=>{
//     res.send('Patch Method...')
// })
// app.delete('/',(req,res)=>{
//     res.send('Delete Method...')
// })


// create port 
app.listen(3000, () => { console.log("server started at port number 3000"); })


