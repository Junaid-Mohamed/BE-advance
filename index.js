const express =  require("express");
const initializeDB = require("./db/db");
const app = express();

initializeDB();

app.get('/',(req,res)=>{
    res.send("Hi world");
})

const userData = {
    name:"John",
    email:"john@gmail.com"
}

const postData = {
    title:"Test post",
    content: "Test post content",
    author: "67235e131e8d604ec2c3ed5c"
}

const User = require("./models/user.models");
const Post = require("./models/post.models");

const addUser = async(userData) => {
    try{
        const newUser = new User(userData);
        await newUser.save()
        console.log(newUser)
    }catch(error){
        console.log(error)
    }
}

// addUser(userData);

const addPost = async(postData) => {
    try{
        const newPost = new Post(postData);
        await newPost.save();
        console.log("Post added", newPost);
    }catch(error){
        console.log(error)
        }
    
}

// addPost(postData);

const getPosts = async() =>{
    try{
        const posts = await Post.find().populate('author');
        console.log(posts);
    }catch(error){
        console.log("error getting posts",error)
    }
}

getPosts();

app.listen(3000, ()=>console.log('App listening on port 3000'))