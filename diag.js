const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'u728463759_Vitrade'
};

async function test() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database');

        const [rows] = await connection.execute('SELECT COUNT(*) as total FROM app_profiles');
        console.log('Count result:', JSON.stringify(rows));

        const [items] = await connection.execute('SELECT * FROM app_profiles LIMIT 5');
        console.log('Items sample (first name):', items[0]?.company_name);

        await connection.end();
    } catch (err) {
        console.error('Database Error:', err.message);
    }
}

test();
