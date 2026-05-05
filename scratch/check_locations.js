const mysql = require('mysql2/promise');

async function checkLocations() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    });

    try {
        console.log('--- UNIQUE ADDRESSES IN BRANDS ---');
        const [brands] = await connection.execute('SELECT DISTINCT address FROM app_brands LIMIT 10');
        console.table(brands);

        console.log('\n--- UNIQUE ADDRESSES IN PROFILES ---');
        const [profiles] = await connection.execute('SELECT DISTINCT company_address FROM app_profiles LIMIT 10');
        console.table(profiles);

    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

checkLocations();
