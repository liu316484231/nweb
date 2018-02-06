var conn = require("../db").ucpconnect;

conn.query("insert into message(from_uid, to_uid, content) values (1,1,\"你好😁\")", function(err, data){
    if(err){
        console.error(err);
    }
    console.log(data);
});
