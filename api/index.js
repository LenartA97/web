const express=require('express');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'});
const fs = require('fs');
const Post = require("./models/post");

const salt = bcrypt.genSaltSync(10);
const secret = 'asdasdw2f';


app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


mongoose.connect('mongodb+srv://jateknaplo:3GsQFm6mEFj9HxoM@jateknaplo.9b5a3me.mongodb.net/?retryWrites=true&w=majority&appName=JatekNaplo')

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({username, password:bcrypt.hashSync(password,salt)});
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
    
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({username, id:userDoc._id},secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
    });
    } else{
        res.status(400).json('wrong creds');
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req,res) => {
    res.cookie("token" , '').json('ok');
})

app.post('/post',uploadMiddleware.single('file') , async (req,res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        content,
        summary,
        cover:newPath
    })

    res.json({postDoc});
});

app.get('/post', async (req,res) => {
    res.json(await Post.find());
});

app.get('/post/:id', async (req,res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id);
    res.json(postDoc);
});

app.delete('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
});

app.listen(4000);

//mongodb+srv://jateknaplo:3GsQFm6mEFj9HxoM@jateknaplo.9b5a3me.mongodb.net/?retryWrites=true&w=majority&appName=JatekNaplo
//mongodb+srv://jateknaplo:<password>@jateknaplo.9b5a3me.mongodb.net/?retryWrites=true&w=majority&appName=JatekNaplo