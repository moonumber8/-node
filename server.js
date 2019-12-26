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
    const phone_number = req.body.phone_number;   
    
    dataModel.create(req.body, (err, doc)=>{
        if(err) res.json({result:"failed"});
        res.json({status:"success",email:email, phone_number:phone_number});
    }); 
});

app.get('/list_data',(req,res)=>{
    dataModel.find((err, doc)=>{
        if (err) res.json({result: "failed"});
        res.json({result: "success", data: doc});
    });

});


app.get('/search/',(req,res)=>{
    dataModel.find({},(err, doc)=>{
        if (err) res.json({result: "failed"});
        res.json({ data: doc });
    });
});

app.get('/search/:phone_number',(req,res)=>{
    dataModel.find({phone_number:{$eq:req.params.phone_number}},(err, doc)=>{
        if (err) res.json({result: "failed"});
        res.json({ data: doc });
    });
});

app.put('/edit_data',(req,res)=>{ 
    const email = req.body.email;
    const item_id = req.body.item_id;
    const phone_number = req.body.phone_number; 
    dataModel.where({ _id: item_id }).update({ $set: { phone_number: phone_number,email:email }},(err,data)=>{
        if(err)res.json({result: "failed"});
        res.json({data: data});
    });
});

app.delete('/delete/:item_id',(req,res)=>{
    const item_id = req.params.item_id;
    console.log("id " + req.body.item_id);
    dataModel.deleteOne({ _id: item_id },(err,data)=>{
        if(err)res.json({result: "failed"});
        res.json({data: data});
    });
});

app.get('/show_detail/:item_id',(req,res)=>{
    const item_id = req.params.item_id;
    console.log("id: "+item_id);
    dataModel.findById(item_id, function (err, doc) { 
        if(err)res.json({result: "failed"});
        res.json({result: "success", data: doc});
     });
});

app.listen(3000,()=>{
    console.log("server ok");
})