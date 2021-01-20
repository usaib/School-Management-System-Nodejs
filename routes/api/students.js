const express=require('express');
const router=express.Router();
const dbconnect=require('../../db/db');
const addCredentials = require('../../extras/addcredentials');


router.get('/getstudents',(req,res)=>{
    let sql='SELECT * from students';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.get('/getstudent/:id',(req,res)=>{
    let id=req.params.id;
    let sql=`Select * from students WHERE Roll_Number=${id}`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.get('/getstudentbyclass/:classid',(req,res)=>{
    let id=req.params.classid;
    let sql=`Select * from students WHERE Class=${id}`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.get('/getstudentbyclassfornotification/:classid',(req,res)=>{
    let id=req.params.classid;
    let sql=`Select Roll_Number,Name from students WHERE Class=${id}`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.post('/addstudent',(req,res)=>{
    let body=req.body;
    let name=body.name;
    let father=body.fname;
    let phone=body.Phone;
    let Class=body.Class;
    let cnic=body.cnic;
    let addstudent={
        'Name':name,
        'Father Name':father,
        'Phone':phone,
        'Class':Class,
        'Cnic Number':cnic
    }
    let sql='INSERT INTO students SET ?';
    let query=dbconnect.query(sql,addstudent,(err,result)=>{
        if (err) throw err;
        addCredentials(body);
        res.json(result);

    });
    
});
router.put('/updatestudent/:id',(req,res)=>{
    let id=req.params.id;
    let body=req.body;
    let name=body.name;
    let father=body.fname;
    let phone=body.Phone;
    let Class=body.Class;
    let cnic=body.cnic;
    let updatestudent={
        'Name':name,
        'Father Name':father,
        'Phone':phone,
        'Class':Class,
        'Cnic Number':cnic
    }
    let sql=`UPDATE students SET ? WHERE Roll_Number=${id}`;
    let query=dbconnect.query(sql,updatestudent,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
    
});
router.delete('/delstudent/:id',(req,res)=>{
    let id=req.params.id;
    let sql=`DELETE from students WHERE Roll_Number=${id}`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
    
});
router.get('/registeredstudent',(req,res)=>{
    let sql=`SELECT id,userid,userpass FROM credentials WHERE Token IS NOT NULL`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
    
});
router.get('/unregisteredstudent',(req,res)=>{
    let sql=`SELECT id,userid,userpass FROM credentials WHERE Token IS NULL OR Token = ''`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
    
});

module.exports=router;