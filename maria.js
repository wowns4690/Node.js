const maria = require('mysql');
const conn = maria.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'NodeWeb'
});
module.exports = conn;