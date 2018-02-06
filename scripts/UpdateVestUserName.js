var md5 = require("md5");
var request = require("request");
var fs = require("fs");
var readline = require("readline");
var async = require("async");
var randomstring = require("randomstring");

var uidList = [];

var rl = readline.createInterface({
   input : fs.createReadStream("./test/nickname.txt")
});

rl.on("line" , function(line){
    var uid = line.split(",")[2];
    var nickName = "焦点网友" + randomstring.generate(7);
    uidList.push({
        uid : uid,
        nickName : nickName
    });
});

rl.on('close', function(){
    console.log('readline close...');
    async.eachSeries(uidList,
        function(obj, callback){
            updateNick(obj.uid, obj.nickName, function(err, data){
                if(err){
                    console.log("修改失败");
                }else{
                    console.log("修改成功!");
                }
                callback();
            });
        },
        function(err){
            if(!err){
                console.log("所有修改成功");
            }
        });
});

function updateNick(uid, nickName, callback) {
    var url = "http://login.focus.cn/api/updateVestInfo";
    var appId = "1001";
    var secret = "00936b9285d6b8665ae9122993fb8e91";
    var sign = "appId=" + appId + "nickName=" + nickName + "uid=" + uid + secret;
    var md5Sign = md5(sign);
    request.post({
        url: url,
        form: {
            uid: uid,
            nickName: nickName,
            appId: appId,
            sign: md5Sign
        }
    }, function (error, response, body) {
        console.log("======" + uid + "======")
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log(JSON.parse(body));
        if(error) callback(error);
        callback(null, body);
    });
}

//简直崩啊