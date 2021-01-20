const express=require('express');
const router=express.Router();
const dbconnect=require('../../db/db');
const setToken=require('../../extras/setToken');
router.post('/credentials',(req,res)=>{
    let body=req.body
    let userid=body.userid;
    let userpass=body.userpass;
    let Token=body.Token;
    let sql=`SELECT id,userid,userpass FROM credentials WHERE credentials.userid="${userid}" AND credentials.userpass="${userpass}"`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        if (result[0]==null){
            res.sendStatus(404);
        }
        else{
            setToken(result,Token);
            res.json(result[0]);
        }
    });
});
module.exports=router;