var DBUtil = require('./../db.js');
var async = require("async");

DBUtil.connection.query("select * from project_comment", function(err, result){
    if(err) {
        console.log(err);
        return;
    }

    console.log(result.length);
});