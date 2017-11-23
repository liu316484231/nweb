var md5 = require("md5");
var Util = require("./util/Util");
var request = require("request");

var name = "zhengzhoujingjigongsi";
var pwd = "qwer1234";
var url = "http://login.focus.cn/api/regForAccredit";
var appId = "1001";
var secret = "00936b9285d6b8665ae9122993fb8e91";
var sign = "appId=" + appId + "name=" + name + "password=" + pwd + secret;
var md5Sign = md5(sign);
var params = "name=" + name + "&password=" + pwd + "&appId=" + appId + "&sign=" + md5Sign;
var reqUrl = url + "?" + params;
request(reqUrl, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    //if(error) return callback(error);
    //callback(null, body);
});