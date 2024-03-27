const mongoose = require('mongoose');
//create a schema: user 
const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique:true, 
        required: false
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : false
    }
})
module.exports = mongoose.model('User', userSchema)