const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'u728463759_Vitrade'
};

async function checkDb() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log("Successfully connected to database:", dbConfig.database);
        
        const [tables] = await connection.query("SHOW TABLES");
        console.log("Tables in database:", tables.map(t => Object.values(t)[0]));
        
        await connection.end();
    } catch (err) {
        console.error("Database connection failed:", err.message);
        
        // If database doesn't exist, try to list all databases
        try {
            const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '' });
            const [dbs] = await connection.query("SHOW DATABASES");
            console.log("Available databases:", dbs.map(d => d.Database));
            await connection.end();
        } catch (err2) {
            console.error("Failed to list databases:", err2.message);
        }
    }
}

checkDb();
