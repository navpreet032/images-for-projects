const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilepic:{type:String, default:''},
    contacts:{type:Array, default:[]}
},{timestamps: true});

module.exports = mongoose.model("User",UserSchema);
//The first argument to mongoose.model() is the singular name of the MongoDB collection that the model represents (in this case, 'User'), while the second argument is the schema definition. The resulting model can be used to create, read, update, and delete documents in the User collection. 