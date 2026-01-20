const { Client } = require('pg');

async function checkDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'yuanyuan', // 使用当前系统用户
    database: 'postgres',
  });

  try {
    console.log('🔌 连接到 PostgreSQL...');
    await client.connect();
    console.log('✅ 连接成功！');

    // 检查 bulletin 数据库是否存在
    const result = await client.query("SELECT 1 FROM pg_database WHERE datname='bulletin'");
    if (result.rows.length > 0) {
      console.log('✅ bulletin 数据库已存在');

      // 检查用户是否存在
      const userResult = await client.query("SELECT 1 FROM pg_user WHERE usename='bulletin'");
      if (userResult.rows.length > 0) {
        console.log('✅ bulletin 用户已存在');
      } else {
        console.log('❌ bulletin 用户不存在，需要创建');
      }

      // 检查 schema 是否存在
      await client.end();

      const bulletinClient = new Client({
        host: 'localhost',
        port: 5432,
        user: 'yuanyuan',
        database: 'bulletin',
      });
      await bulletinClient.connect();

      const schemaResult = await bulletinClient.query(
        "SELECT 1 FROM information_schema.schemata WHERE schema_name='shiwan_ceramics'"
      );
      if (schemaResult.rows.length > 0) {
        console.log('✅ shiwan_ceramics schema 已存在');

        const tableResult = await bulletinClient.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema='shiwan_ceramics'
          ORDER BY table_name
        `);
        console.log('✅ 已创建的表:', tableResult.rows.map(r => r.table_name).join(', '));
      } else {
        console.log('❌ shiwan_ceramics schema 不存在，需要运行 create-schema.sql');
      }

      await bulletinClient.end();
    } else {
      console.log('❌ bulletin 数据库不存在，需要创建');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ 错误:', err.message);
    process.exit(1);
  }
}

checkDatabase();
