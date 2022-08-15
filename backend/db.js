const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Hungrezy";

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo sucessfully");
    })
}
module.exports=connectToMongo;