const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentialls',true);
    next();
});

app.get('/',(req,res)=>{
    res.end("welcome to junker")
});

app.get('/home',(req,res)=>{
    res.end("welcome to home")
});

app.post('/api',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //res.end("result: " + result);
    
    res.json({status:"success",email:email, password:password});
});

app.listen(3000,()=>{
    console.log("server ok");
});
