var DBUtil = require('./../db.js');
var async = require("async");

var provinceId = 21;
DBUtil.connection.query("select * from geo_city where province_id = ?" , [provinceId], function(err, result) {
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
    async.each(result, function(item, callback){
        var cityId = item.city_id;
        var adcode = item.adcode;
        var geoLat = item.geo_lat;
        var geoLng = item.geo_lng;
        var districtName = "城区";
       DBUtil.connection.query("insert into geo_district (city_id, adcode, district_name, geo_lat, geo_lng) values (?, ?, ?, ?, ?)",
       [cityId, adcode, districtName, geoLat, geoLng], function(err, rows){
                var districtId = rows.insertId;
                console.log(districtId);
               DBUtil.connection.query("insert into geo_virtual_district (city_id, virtual_district_name) values (?, ?)",
               [cityId, districtName], function(err, rows){
                    var vDistrictId = rows.insertId;
                    DBUtil.connection.query("insert into geo_virdistrict_district (virtual_district_id, district_id, relation_type) values (?, ?, ?)", [vDistrictId, districtId, 1], function(err){
                        callback();
                    });
               });
           });
    }, function(err){
        if(err) {
            console.log(err);
        }
        console.log('done..');
    });
});