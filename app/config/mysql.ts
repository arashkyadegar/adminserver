import 'dotenv/config'
var mysql = require('mysql');
export class MysqlClient {
  connection;

  async dbconnect(): Promise<any> {
    this.connection = mysql.createConnection({
      host: 'parsresan.ir',
      user: 'parsresa_parsresa',
      password: 'O?#jNbi!]]%7',
      database : 'parsresa_admindb'
    });

    return this.connection;
  }

  async dbclose() {
    this.connection.end(function (err) {
      console.log('connection end.')
    });
  }

}