const mysql = require('mysql2/promise');
const fs = require('fs');

async function checkSchema() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("DESCRIBE app_profiles");
        fs.writeFileSync('profiles_schema.json', JSON.stringify(rows, null, 2));
        await connection.end();
    } catch (err) {
        fs.writeFileSync('schema_error.txt', err.message);
    }
}
checkSchema();
