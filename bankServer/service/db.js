// import mongoose
const mongoose=require("mongoose")

// state connection string
mongoose.connect('mongodb://0.0.0.0:27017/bankServer',{useNewUrlparser:true})

// model(schema) creation (model name must be singularform of collection name and first letter capital)
// schema means fields and values

const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[] 
})

module.exports={
    User
}