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



//////////////////////////////////////////////////////////////
//old file
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
    let query=dbconnect.query(sql,notification,(err,result)=>{
        if (err) throw err;
    });
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
            res.json(result); 
        });

    });
});