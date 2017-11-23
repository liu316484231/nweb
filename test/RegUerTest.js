var md5 = require("md5");
var request = require("request");
var async = require("async");
var Util = require("../util/Util");
var fs = require("fs");

var userNameList = [];

for(var i = 1; i < 81; i++){
    var userName;
    if(i >= 1 && i < 10) {
        userName = "oversea" + "000" + i;
    }else{
        userName = "oversea" + "00" + i;
    }
    userNameList.push(userName);
}

console.log(userNameList);

async.eachSeries(userNameList, function(userName, callback){
    var pwd = Util.genPwd();
    fs.appendFileSync("./info.txt", userName + "/" + pwd + "\n");
    regUser(userName, pwd, function(err, body){
        if(err){
            console.log(err);
            callback(err);
        }
        console.log("register " + userName + " success--");
        console.log(JSON.stringify(body));
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


