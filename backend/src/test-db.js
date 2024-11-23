import pool from './db.js';

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Conexión al pool de base de datos exitosa.');
    } catch (error) {
        console.error('Error al conectar al pool de base de datos:', error.message);
    }
}

testConnection();
