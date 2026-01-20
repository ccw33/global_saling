const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'bulletin',
  password: 'bulletin',
  database: 'bulletin_dev',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database connection successful!');
    console.log('Server time:', res.rows[0].now);
    
    // Check schema
    pool.query("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'shiwan_ceramics'", (err, res) => {
      if (err) {
        console.error('Schema check failed:', err.message);
      } else if (res.rows.length > 0) {
        console.log('✅ Schema shiwan_ceramics exists');
        
        // Check tables
        pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'shiwan_ceramics\'', (err, res) => {
          if (err) {
            console.error('Tables check failed:', err.message);
          } else {
            console.log('✅ Tables found:', res.rows.map(r => r.table_name).join(', '));
          }
          pool.end();
        });
      } else {
        console.log('❌ Schema shiwan_ceramics not found');
        pool.end();
      }
    });
  }
});
