const mysql = require('mysql2/promise');

async function checkBlogsFull() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM app_blogs');
        console.log(JSON.stringify(rows, null, 2));
        await connection.end();
    } catch (err) {
        console.error('Error checking blogs:', err);
    }
}

checkBlogsFull();
