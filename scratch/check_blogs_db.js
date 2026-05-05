const mysql = require('mysql2/promise');

async function checkBlogs() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT id, title, status, is_published FROM app_blogs');
        console.log('--- BLOGS IN DATABASE ---');
        console.table(rows);
        await connection.end();
    } catch (err) {
        console.error('Error checking blogs:', err);
    }
}

checkBlogs();
