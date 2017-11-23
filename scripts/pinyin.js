var DBUtil = require('./../db.js');
var async = require("async");

DBUtil.connection.query("select * from geo_city" , [], function(err, result) {
    if(err){
        console.log(err);
        return;
    }
    async.each(result, function(item, callback){
        var cityId = item.city_id;
        var prefix = item.city_prefix;
        DBUtil.connection.query("update geo_city set city_pinyin = ? where city_id = ?",
            [prefix, cityId], function(err, rows){
                callback();
            });
    }, function(err){
        if(err) {
            console.log(err);
        }
        console.log('done..');
    });
});