const mysql = require('mysql2/promise');

async function test() {
    try {
        const conn = await mysql.createConnection({host: 'localhost', user: 'root', password: ''});
        console.log('Successfully connected to MySQL');
        const [dbs] = await conn.query('SHOW DATABASES');
        console.log(dbs.map(d => d.Database));
        process.exit(0);
    } catch (err) {
        console.error('FAILED TO CONNECT:');
        console.error(err);
        process.exit(1);
    }
}
test();
