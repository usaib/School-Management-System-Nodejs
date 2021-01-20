const dbconnect=require('../db/db');

function setToken(result,Token){

    updatedToken=result[0];
    userid=updatedToken.userid;
    userpass=updatedToken.userpass;
    console.log(updatedToken);
    data={
        Token:Token
    };
    sql1=`UPDATE credentials SET credentials.Token="${Token}" WHERE userid="${userid}" AND userpass="${userpass}"`;
    let query=dbconnect.query(sql1,(err,result)=>{
        if (err) throw err;

    });
}







module.exports=setToken;