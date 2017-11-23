var mysql = require('mysql');
var config = require('config');

var DBUtil = {};

var connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port
});

var connectionOld = mysql.createConnection({
    host: config.oldDb.host,
    user: config.oldDb.user,
    password: config.oldDb.password,
    database: config.oldDb.database,
    port: config.oldDb.port
});

DBUtil.connection = connection;
DBUtil.connectionOld = connectionOld;

module.exports = DBUtil;
