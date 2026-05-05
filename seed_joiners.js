const mysql = require('mysql2/promise');
const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'u728463759_Vitrade' };
async function seed() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        console.log('Seeding sample joiners...');
        await conn.query(`INSERT INTO app_free_joiners (full_name, email, mobile, company_name, gst) VALUES 
            ('Rajesh Kumar', 'rajesh@example.com', '9876543210', 'RK Traders', '22AAAAA0000A1Z5'),
            ('Amit Sharma', 'amit@sharma.in', '9988776655', 'Sharma Electronics', '27BBBBB1111B2Z6'),
            ('Priya Singh', 'priya@vitrade.com', '9123456789', 'Singh & Co', '07CCCCC2222C3Z7')`);
        console.log('Sample joiners seeded successfully!');
        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
seed();
