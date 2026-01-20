const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function createSchema() {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'bulletin',
    password: 'bulletin',
    database: 'bulletin_dev',
  });

  try {
    console.log('🔌 连接到 bulletin_dev 数据库...');
    await client.connect();
    console.log('✅ 连接成功！\n');

    // 读取 SQL 文件
    const sqlFile = path.join(__dirname, 'docs/create-schema-only.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('📝 执行 schema 创建脚本...\n');

    // 执行 SQL
    await client.query(sql);

    console.log('✅ Schema 创建成功！\n');

    // 验证表是否创建成功
    console.log('📊 验证表...');
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='shiwan_ceramics'
      ORDER BY table_name
    `);

    console.log(`✅ 创建了 ${result.rows.length} 个表:`);
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    console.log('\n');

    // 检查示例数据
    const counts = await client.query(`
      SELECT
        (SELECT COUNT(*) FROM shiwan_ceramics.categories) as categories,
        (SELECT COUNT(*) FROM shiwan_ceramics.masters) as masters,
        (SELECT COUNT(*) FROM shiwan_ceramics.products) as products,
        (SELECT COUNT(*) FROM shiwan_ceramics.blogs) as blogs
    `);

    console.log('📈 示例数据统计:');
    console.log(`   分类: ${counts.rows[0].categories}`);
    console.log(`   大师: ${counts.rows[0].masters}`);
    console.log(`   产品: ${counts.rows[0].products}`);
    console.log(`   博客: ${counts.rows[0].blogs}`);

    console.log('\n✅ 数据库设置完成！');
    console.log('\n下一步:');
    console.log('  cd frontend');
    console.log('  npm run dev');
    console.log('\n然后访问: http://localhost:3000/zh/');

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ 错误:', err.message);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

createSchema();
