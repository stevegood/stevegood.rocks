// require('newrelic');

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
  var port = process.env.PORT;
  var host = process.env.VCAP_APP_HOST;
}
console.log(sqlCredentials);
console.log(mailCredentials);

config = {
    development: {
      url: 'http://localhost:2368',
      database: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, '/content/data/ghost-dev.db')
        },
        debug: false
      },
      server: {
        host: '127.0.0.1',
        port: '2368'
      },
      paths: {
        contentPath: path.join(__dirname, '/content/')
      }
    },
    // Cloud Foundry
    production: {
      url: 'http://www.stevegood.rocks',
      mail: {
        transport: 'SMTP',
        options: {
          service: 'Sendgrid',
          auth: {
            user: mailCredentials.username,
            pass: mailCredentials.password,
          }
        }
      },
      database: {
        client: 'pg',
        connection: sqlCredentials.uri,
        pool: {
          min: 2,
          max: 4
        },
        debug: false
      },
      server: {
        host: host,
        port: port
      },
      logging: false
    },

};
module.exports = config;
