import * as mysql from 'mysql2';

// Pollyfill Symbol.dispose
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Symbol.dispose ??= Symbol('dispose');

export function createConnection() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: 'UTF8_GENERAL_CI',
  });

  return {
    connection,
    [Symbol.dispose]() {
      connection.end();
    },
  };
}
