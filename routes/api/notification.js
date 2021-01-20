const express=require('express');
const router=express.Router();
const dbconnect=require('../../db/db');
const admin = require('firebase-admin');
//Path to firebase-admin-SDK
var serviceAccount = require("../../smart-kids-96ec0-firebase-adminsdk-b21ek-f1bddf4bbf.json");
//initializing firebase-admin-app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smart-kids-96ec0.firebaseio.com"
  });
router.get('/getnotifications/:id',(req,res)=>{
    let id=req.params.id;
    let sql=`SELECT notifications.notification_title,notifications.description,notifications.notification_time FROM notifications JOIN students_notifications_bridge ON students_notifications_bridge.notification_id = notifications.notification_id WHERE students_notifications_bridge.student_id =${id} ORDER BY notifications.notification_id DESC`;
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json({"notifications":result});
    });
});
router.get('/getallnotifications',(req,res)=>{
    let sql='SELECT * from notifications';
    let query=dbconnect.query(sql,(err,result)=>{
        if (err) throw err;
        res.json(result);
    });
});
router.post('/sendnotification',(req,res)=>{
    let body=req.body;
    let time=body.time;
    let title=body.title;
    let description=body.description;
    let student_ids=body.student_ids;
    console.log(student_ids);
    let ids=`(${student_ids})`;    
    console.log(ids);

    let sql='INSERT INTO notifications SET ?';
    let notification={
        notification_title:title,
        notification_time:time,
        description:description
    }
    let query=dbconnect.query(sql,notification,(err,result)=>{
        if (err) throw err;
        let sql1=`SELECT notification_id from notifications WHERE notification_title="${title}" AND notification_time="${time}" AND description="${description}"`;
    console.log(time,title,description,sql1);
    let query1=dbconnect.query(sql1,(err,result)=>{
        if (err) throw err;
        console.log(result);
        notification_id=result[0].notification_id
        let sql2='INSERT INTO students_notifications_bridge (notification_id,student_id) VALUES ?';
        let values=[];
        for(i=0;i<student_ids.length;i++){
            values.push([notification_id,student_ids[i]]);
        }
        console.log(values,notification_id);
        let queries=dbconnect.query(sql2,[values],(err,result)=>{
            if (err) throw err;  
            console.log(result);
        });

    });
    });
   
    
    let sql3=`SELECT Token from credentials WHERE id IN ${ids}`;
    let query3=dbconnect.query(sql3,(err,result)=>{
            if (err) throw err;
            Tokens=[];
            for(i=0;i<result.length;i++){
                Tokens.push(result[i].Token);
            }
            function send_to_multiple(Tokens){
                const registrationTokens = Tokens;
                  
                  const message = {
                    data: {score: title, time: description},
                    tokens: registrationTokens,
                  }
                  
                  admin.messaging().sendMulticast(message)
                    .then((response) => {
                      if (response.failureCount > 0) {
                        const failedTokens = [];
                        response.responses.forEach((resp, idx) => {
                          if (!resp.success) {
                            failedTokens.push(registrationTokens[idx]);
                          }
                        });
                        console.log('List of tokens that caused failures: ' + failedTokens);
                      }
                    });
            }
            send_to_multiple(Tokens);
            
        }); 
});

router.post('/sendnotificationstoall',(req,res)=>{
    let body=req.body;
    let time=body.time;
    let title=body.title;
    let description=body.description;   
    let student_ids=[];
    let sql='INSERT INTO notifications SET ?';
    let notification={
        notification_title:title,
        notification_time:time,
        description:description
    }
    let students='SELECT Roll_Number from students';
    let ids=dbconnect.query(students,function ids(err,result){
        if (err) throw err;
        for(i=0;i<result.length;i++){
            student_ids.push(result[i].Roll_Number);
        }
        console.log(student_ids);
        let query=dbconnect.query(sql,notification,(err,result)=>{
        if (err) throw err;
        let sql1=`SELECT notification_id from notifications WHERE notification_title="${title}" AND notification_time="${time}" AND description="${description}"`;
        let query1=dbconnect.query(sql1,(err,result)=>{
        if (err) throw err;
        notification_id=result[0].notification_id
        let sql2='INSERT INTO students_notifications_bridge (notification_id,student_id) VALUES ?';
        let values=[];
        for(i=0;i<student_ids.length;i++){
            values.push([notification_id,student_ids[i]]);
        }
        let queries=dbconnect.query(sql2,[values],(err,result)=>{
            if (err) throw err;  
            res.json(result); 
        });

    });
    });
    });
    function send_to_all(){
        var topic = 'general';
        var message = {
        data: {
            score: title,
            time: description
        },
        topic: topic
        };

        // Send a message to devices subscribed to the provided topic.
        admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
    }
    send_to_all();
});

module.exports=router;