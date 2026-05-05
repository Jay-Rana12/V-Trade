const mysql = require('mysql2/promise');

async function test() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };

    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to database');
        
        const [tables] = await connection.query('SHOW TABLES');
        console.log('Tables:', tables.map(t => Object.values(t)[0]));
        
        const [brands] = await connection.query('SELECT COUNT(*) as count FROM app_brands');
        console.log('Brands count:', brands[0].count);
        
        await connection.end();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
    }
}

test();
