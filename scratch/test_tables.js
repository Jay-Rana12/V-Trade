const mysql = require('mysql2/promise');
const fs = require('fs');

async function test() {
    try {
        const c = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'u728463759_Vitrade'});
        const [r] = await c.execute('SHOW TABLES');
        fs.writeFileSync('tables_short.txt', r.map(row => Object.values(row)[0]).join('\n'));
        await c.end();
    } catch(e) { fs.writeFileSync('tables_error.txt', e.message); }
}
test();
