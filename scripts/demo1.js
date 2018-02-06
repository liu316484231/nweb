const request = require("request");
const async = require("async");

function getBase(callback) {
    request.get("http://house-sv-base.focus.cn/health", function (err, data, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("base: " + body);
        }
    });
}

function getComment(callback) {
    request.get("http://house-sv-comment.focus.cn/health", function (err, data, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("comment: " + body);
        }
    });
}

console.log("done");