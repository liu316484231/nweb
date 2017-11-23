var DBUtil = require('./../db.js');
var async = require("async");

DBUtil.connection.query("select building_photo_id from project_building_photo" ,function(err, result){
    if(err){
        console.log(err);
        return;
    }
    console.log(result.length);
    async.each(result, function(item, callback){
        //console.log(item);
        var buildingPhotoId = item.building_photo_id;
        DBUtil.connectionOld.query("select status from project_photos_relation where photo_id = ? and type = 2", [buildingPhotoId], function(err, result2){
            if(result2 != null && result2.length != 0){
                var status = result2[0].status;
                //console.log(buildingPhotoId + ":" + status);
                DBUtil.connection.query("update project_building_photo set status = ? where building_photo_id = ?", [status, buildingPhotoId], function(err){
                    if(err != null) console.log(err);
                    callback();
                });
            }else{
                callback();
            }
        });
    }, function(err){
        if(err) {
            console.log(err);
        }
        console.log('done..');
    });
});

