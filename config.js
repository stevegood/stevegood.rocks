var path = require('path'),
    config, mysql;

var env = process.env.NODE_ENV || 'development';
var production = env == 'production';

var cfCore = {};
var sqlCredentials = {};
var mailCredentials = {};
if (production) {
  var svcs = JSON.parse(process.env.VCAP_SERVICES);
  var sqlCredentials = svcs["elephantsql"][0].credentials;
  var mailCredentials = svcs["sendgrid"][0].credentials;
}
console.log(sqlCredentials);
console.log(mailCredentials);
