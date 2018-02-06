var md5 = require("md5");
var request = require("request");

var arguments = process.argv.splice(2);
var name = "";
var pwd = "";
if(arguments != null && arguments.length == 2){
    name = arguments[0];
    pwd = arguments[1];
}else{
    name = "测试一下321";
    pwd = "qwer1234";
}
var url = "https://login.focus.cn/api/regForAccredit";
var appId = "1001";
var secret = "00936b9285d6b8665ae9122993fb8e91";
var sign = "appId=" + appId + "name=" + name + "password=" + pwd + secret;
var md5Sign = md5(sign);
request.post({
    url : url,
    form : {
        name : name,
        password : pwd,
        appId : appId,
        sign : md5Sign
    }
}, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log(JSON.parse(body));
});

//简直崩啊