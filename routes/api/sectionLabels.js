const express=require('express');
const router=express.Router();
const dbconnect=require('../../db/db');
router.get('/getsectionlabels',(req,res)=>{
    let sql='SELECT * from sections';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.put('/updatesectionlabel/:id',(req,res)=>{
    let id=req.params.id;
    let body=req.body;
    let sec_name=body.sec_name;
    let updatedsec={
        sec_name:sec_name,
    }
    let sql=`UPDATE sections SET ? WHERE sec_id='${id}'`;
    console.log(sql);
    let query=dbconnect.query(sql,updatedsec,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.post('/addsectionlabel',(req,res)=>{
    let body=req.body;
    let sec_name=body.sec_name;
    let addsec={
        sec_name:sec_name
    }
    let sql=`INSERT INTO sections SET ?`;
    console.log(sql);
    let query=dbconnect.query(sql,addsec,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.delete('/delsectionlabel/:id',(req,res)=>{
    let id=req.params.id;
    let sql=`DELETE FROM sections WHERE sec_id=${id}`;
    console.log(sql);
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
module.exports=router;