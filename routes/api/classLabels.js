const express=require('express');
const router=express.Router();
const dbconnect=require('../../db/db');
router.get('/getclasslabels',(req,res)=>{
    let sql='SELECT class_id,roman_name from classes';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.get('/getclasslabelsfordetails',(req,res)=>{
    let sql='SELECT * from classes';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.put('/updateclasslabel/:id',(req,res)=>{
    let id=req.params.id;
    let body=req.body;
    let class_name=body.class_name;
    let roman_name=body.roman_name;
    let updatedclass={
        roman_name:roman_name,
        class_name:class_name
    }
    let sql=`UPDATE classes SET ? WHERE class_id='${id}'`;
    console.log(sql);
    let query=dbconnect.query(sql,updatedclass,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.post('/addclasslabel',(req,res)=>{
    let body=req.body;
    let class_name=body.class_name;
    let roman_name=body.roman_name;
    let addclass={
        roman_name:roman_name,
        class_name:class_name
    }
    let sql=`INSERT INTO classes SET ?`;
    console.log(sql);
    let query=dbconnect.query(sql,addclass,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.delete('/delclasslabel/:id',(req,res)=>{
    let id=req.params.id;
    let sql=`DELETE FROM classes WHERE class_id=${id}`;
    console.log(sql);
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
module.exports=router;