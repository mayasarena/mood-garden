const pool = require('./db'); // Adjust the path if necessary

// Test the connection
async function testConnection() {
    try {
        // Attempt to run a simple query
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', result.rows[0]);
    } catch (error) {
        console.error('Database connection error:', error);
    } finally {
        // End the pool to close connections
        await pool.end();
    }
}

testConnection();
