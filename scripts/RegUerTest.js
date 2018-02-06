var md5 = require("md5");
var request = require("request");
var async = require("async");
var Util = require("../util/Util");
var fs = require("fs");

var userNameList = [];

for(var i = 1; i <= 6; i++){
    userNameList.push({
        userName : "zhengzhou" + i,
        password : "mima" + i
    });
}

console.log(userNameList);

async.eachSeries(userNameList, function(obj, callback){
    regUser(obj.userName, obj.password, function(err, body){
        if(err){
            console.log(err);
            callback(err);
        }
        console.log("register " + obj.userName + " success--");
        console.log(body);
        body = JSON.parse(body);
        var uid;
        if(body.data == null){
            uid = "昵称重复";
        }else{
            uid = body.data.uid;
        }
        fs.appendFileSync("./info.txt", uid + "/" + obj.userName + "/" + obj.password + "\n");
        callback();
    });
},function(err){
    if( err ) {
        console.log('error');
    } else {
        console.log('successfully');
    }
});

function regUser(name, pwd, callback) {
    //var name = "oversea";
    //var pwd = "qwer1234";
    var url = "http://login.focus.cn/api/regForAccredit";
    var appId = "1004";
    var secret = "0216e919227a812d872e059bde028c31";
    var sign = "appId=" + appId + "name=" + name + "password=" + pwd + secret;
    var md5Sign = md5(sign);
    var params = "name=" + name + "&password=" + pwd + "&appId=" + appId + "&sign=" + md5Sign;
    var reqUrl = url + "?" + params;
    request(reqUrl, function (error, response, body) {
        //console.log('error:', error);
        //console.log('statusCode:', response && response.statusCode);
        //console.log('body:', body);
        if(error) return callback(error);
        callback(null, body);
    });
}


