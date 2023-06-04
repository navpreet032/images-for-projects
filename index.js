const express = require('express');
const dotenv = require('dotenv');
const app = express();
const authRoute = require('./routes/r_auth');
const userRoute = require('./routes/r_users');

const mongoose = require('mongoose');
//create a user in mongoDB  to access the DB.

dotenv.config();

main().catch(err => console.log(err));
// async fun to connect to mongodb 
// rocess.env.MONGO_URL is used to get the url from .env file
async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log("Connected to MongoDb !"))
  .catch((err) =>console.log(err));
}//If you don't use an arrow function and directly write console.log instead, it would cause the console.log statement to be executed immediately rather than being passed as a callback function to the then() method.

app.use(express.json())// to accept json format

app.use('/api/auth',authRoute);
app.use("/api/users", userRoute);

app.listen(8080,()=>{
    console.log("Server is running!");
})