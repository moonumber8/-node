const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db');
const dataModel = require('./data_schema');

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
    const email = req.body.email; //req.body.email มาจาก body-parser
    const password = req.body.password;   
    
    dataModel.create(req.body, (err, doc)=>{
        if(err) res.json({result:"failed"});
        res.json({status:"success",email:email, password:password});
    });
   
});

app.get('/api',(req,res)=>{
    dataModel.find((err, doc)=>{
        if (err) res.json({result: "failed"});
        res.json({result: "success", data: doc});
    });

});

app.listen(3000,()=>{
    console.log("server ok");
});

