const fs = require('fs');
const { Client } = require('pg');
const path = require('path');

async function checkAndCreateSchema() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'bulletin',
    password: 'bulletin',
    database: 'bulletin',
  });

  try {
    console.log('🔌 连接到 bulletin 数据库...');
    await client.connect();
    console.log('✅ 连接成功！\n');

    // 检查 schema 是否存在
    const schemaCheck = await client.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name='shiwan_ceramics'"
    );

    if (schemaCheck.rows.length > 0) {
      console.log('✅ shiwan_ceramics schema 已存在\n');

      // 检查表是否存在
      const tables = await client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='shiwan_ceramics'
        ORDER BY table_name
      `);

      if (tables.rows.length > 0) {
        console.log('📊 已存在的表:');
        tables.rows.forEach(row => {
          console.log(`   - ${row.table_name}`);
        });
        console.log('');

        // 检查数据
        const counts = await client.query(`
          SELECT
            (SELECT COUNT(*) FROM shiwan_ceramics.categories) as categories,
            (SELECT COUNT(*) FROM shiwan_ceramics.masters) as masters,
            (SELECT COUNT(*) FROM shiwan_ceramics.products) as products,
            (SELECT COUNT(*) FROM shiwan_ceramics.blogs) as blogs
        `);

        console.log('📈 数据统计:');
        console.log(`   分类: ${counts.rows[0].categories}`);
        console.log(`   大师: ${counts.rows[0].masters}`);
        console.log(`   产品: ${counts.rows[0].products}`);
        console.log(`   博客: ${counts.rows[0].blogs}\n`);

        console.log('✅ 数据库已完全配置好！');
      } else {
        console.log('⚠️  Schema 存在但没有表，需要执行 create-schema-only.sql');
      }
    } else {
      console.log('❌ shiwan_ceramics schema 不存在\n');
      console.log('📝 请执行以下命令创建 schema:');
      console.log('   psql -U bulletin -d bulletin -f docs/create-schema-only.sql\n');
    }

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ 错误:', err.message);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

checkAndCreateSchema();
