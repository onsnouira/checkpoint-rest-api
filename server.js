const express = require("express");
const mongoose = require ("mongoose");
const dotenv = require ('dotenv');
dotenv.config({ path :'./config/.env'});
const user = require('./models/User')
const app = express();
app.use(express.json());    //Middleware that parse request with json payload


//connect data base to server using mongo ATLAS
const URI = process.env.MONGO_URI;
mongoose.connect(URI)
    .then(() => console.log ("connected to data base succesfully"))
    .catch((err) => console.log ("connection failed", err) );


//method:POST
app.post('/user', async (req,res) =>{
    try {
        const createuser = new user (req.body)
        await createuser.save()
        res.status(201).json({msg:"user created",createuser})
    }
    catch(err){
        res.status(500).json({msg:'failed to create',err})
    }
})    

//method:GET
app.get('/users', async (req,res) =>{
    try{
        const users=await user.find()
        res.status(200).json({msg :" find all users", users})
    }
    catch(err){
        res.status(500).json({msg:'failed to finded',err})
    }
})

//method:PUT
//update by id
app.put('/user/:id' , async (req,res) =>{
    try{
        const userupdated = req.params.id
        const updateuser = req.body
        const newuser = await user.findByIdAndUpdate(userupdated,updateuser,{new : true})
        res.status(200).json({msg:"user updated",newuser})
    }
    catch(err){
        res.status(500).json({msg:'failed to update',err})
    }
})

//method:DELETE
//delete by id 
app.delete('/user/:id' , async (req,res) =>{
    try{
        const userdel = req.params.id;
        const deleteuser= await user.findByIdAndDelete(userdel)
        res.status(200).json({msg :"user deleted", deleteuser})
    }
    catch(err){
        res.status(500).json({msg:'failed to update',err})
    }
})

//create server 
const port = process.env.PORT ;
app.listen(port, () => { console.log('serving running on port:', port) });