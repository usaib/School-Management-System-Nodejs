const express=require('express');
const router=express.Router();
const dbconnect=require('../../db/db');
router.get('/getcreatedclasslabels',(req,res)=>{
    let sql='SELECT classes.roman_name,sections.sec_name,class_sec_bridge.room_no,class_sec_bridge.strength, class_sec_bridge.class_sec_bridge_id FROM classes,sections,class_sec_bridge WHERE classes.class_id=class_sec_bridge.class_id AND sections.sec_id=class_sec_bridge.sec_id';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.delete('/delcreatedclasslabel/:id',(req,res)=>{
    let id=req.params.id;
    let sql=`DELETE FROM class_sec_bridge WHERE class_sec_bridge_id=${id}`;
    console.log(sql);
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.put('/updatecreatedclasslabel/:id',(req,res)=>{
    let id=req.params.id;
    let body=req.body;
    let class_id=body.class_id;
    let sec_id=body.sec_id;
    let room_no=body.room_no;
    let strength=body.strength;
    let updatedclass={
        sec_id:sec_id,
        class_id:class_id,
        room_no:room_no,
        strength:strength
    }
    let sql=`UPDATE class_sec_bridge SET ? WHERE class_sec_bridge_id='${id}'`;
    console.log(sql);
    let query=dbconnect.query(sql,updatedclass,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.post('/addcreatedclasslabel',(req,res)=>{

    let body=req.body;
    let class_id=body.class_id;
    let sec_id=body.sec_id;
    let room_no=body.room_no;
    let strength=body.strength;
    let addedclass={
        sec_id:sec_id,
        class_id:class_id,
        room_no:room_no,
        strength:strength
    }
    let sql=`INSERT INTO class_sec_bridge SET ? `;
    console.log(sql);
    let query=dbconnect.query(sql,addedclass,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});

router.get('/getclassseclabels',(req,res)=>{
    let sql='SELECT sec_name , roman_name , class_sec_bridge_id FROM sections s JOIN class_sec_bridge t ON s.sec_id=t.sec_id JOIN classes c ON t.class_id=c.class_id';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.get('/getclassesdetails',(req,res)=>{
    sql='SELECT classes.roman_name As Class_Name, sections.sec_name, class_sec_bridge.strength, class_sec_bridge.room_no FROM class_sec_bridge JOIN classes ON class_sec_bridge.class_id = classes.class_id JOIN sections ON class_sec_bridge.sec_id = sections.sec_id WHERE class_sec_bridge.class_id = classes.class_id AND class_sec_bridge.sec_id = sections.sec_id';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
module.exports=router;