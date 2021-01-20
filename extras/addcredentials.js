const dbconnect=require('../db/db');
function addCredentials(body){
    credname=body.name;
    credphone=body.Phone;
    let sql1=`SELECT * from students WHERE students.Name='${credname}' AND students.Phone='${credphone}'`;
    let query=dbconnect.query(sql1,(err,result)=>{
        if (err) throw err;
        console.log(result);
        credname='ST-'+credname;
        let idOfStudent=result[0].Roll_Number;
        credentials={
            id:idOfStudent,
            userid: credname,
            userpass: credphone

       };
       console.log(credentials);
       let sql2='INSERT INTO credentials SET ?';
       let anotherquery=dbconnect.query(sql2,credentials,(err,result)=>{
        if (err) throw err;
        console.log(result);
       });

    });

}
module.exports=addCredentials;
