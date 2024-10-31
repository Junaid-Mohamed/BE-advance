const express =  require("express");
const initializeDB = require("./db/db");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors")

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Hi world");
})

const verifyJWT = (req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1];
    console.log("inside verify")
    console.log(token);

    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    try{
        console.log(jwt.verify(token, JWT_SECRET));
        next();
    }catch(error){
        res.status(402).json({message:"Invalid token provided"})
    }
}

app.post('/login', (req,res)=>{
    const {username, password} = req.body;

    if(username === "admin" && password === "password"){
        const token = jwt.sign({username,password},JWT_SECRET, {expiresIn:'1h'})
        res.json({token})
    }else{
        res.json({error: 'Invalid username/password'})
    }
})

app.get('/admin/data', verifyJWT, (req,res)=>{
    res.status(200).json({message:"Data accessible"})
})



app.listen(3000, ()=>console.log('App listening on port 3000'))