require('dotenv').config();
const mongoose =  require("mongoose"); 

const connect = (uri) => {  
    mongoose.connect(uri)
.then(res => console.log(`Connection Succesful...`))
.catch(err => console.log(`Error in DB connection`)); 
}


module.exports = connect(process.env.mongoURI);    