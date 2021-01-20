const mysql=require('mysql');
//db connection creation
let dbconnect = mysql.createPool({
    connectionLimit : 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flaskcrud',
    multipleStatements: true
  });
//db connect 
// dbconnect.connect((err)=>{
//     if (err) throw err;
//     console.log('MySQL is Connected..')
// });

module.exports=dbconnect;