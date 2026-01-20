const { Client } = require('pg');

// 测试 OrbStack PostgreSQL 的不同配置
const configs = [
  // OrbStack 常见配置
  { host: 'localhost', port: 5433, user: 'postgres', database: 'postgres' },
  { host: 'localhost', port: 5433, user: 'postgres', database: 'postgres', password: 'postgres' },
  { host: 'localhost', port: 5433, user: 'postgres', database: 'bulletin' },
  { host: 'localhost', port: 5433, user: 'postgres', database: 'bulletin', password: 'postgres' },
  { host: 'localhost', port: 5433, user: 'root', database: 'postgres' },
  { host: 'localhost', port: 5433, user: 'root', database: 'postgres', password: 'root' },

  // 本地 PostgreSQL (如果也在运行)
  { host: 'localhost', port: 5432, user: 'yuanyuan', database: 'postgres' },
  { host: 'localhost', port: 5432, user: 'yuanyuan', database: 'bulletin' },
];

async function testConnection(config, index) {
  const client = new Client({
    ...config,
    connectionTimeoutMillis: 3000, // 3秒超时
  });

  try {
    await client.connect();
    const result = await client.query('SELECT version(), current_database(), current_user');
    await client.end();

    console.log(`✅ 配置 ${index + 1} 成功!`);
    console.log(`   连接: ${config.host}:${config.port}`);
    console.log(`   用户: ${config.user}`);
    console.log(`   数据库: ${result.rows[0].current_database}`);
    console.log(`   当前用户: ${result.rows[0].current_user}`);
    console.log(`   版本: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    console.log('');

    // 列出所有数据库
    const client2 = new Client({ ...config, database: 'postgres' });
    await client2.connect();
    const dbs = await client2.query('SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname');
    await client2.end();

    console.log(`   可用数据库: ${dbs.rows.map(r => r.datname).join(', ')}`);
    console.log('');

    return config;
  } catch (err) {
    await client.end().catch(() => {});
    return null;
  }
}

async function main() {
  console.log('🔍 检测 OrbStack/本地 PostgreSQL 配置...\n');

  let workingConfigs = [];

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    process.stdout.write(`[${i + 1}/${configs.length}] 测试 ${config.host}:${config.port} (${config.user})... `);

    const result = await testConnection(config, i);

    if (result) {
      workingConfigs.push(result);
    } else {
      console.log('❌');
    }
  }

  if (workingConfigs.length > 0) {
    console.log('\n🎯 找到可用的配置!\n');
    console.log('推荐配置:');
    console.log(`POSTGRES_HOST=${workingConfigs[0].host}`);
    console.log(`POSTGRES_PORT=${workingConfigs[0].port}`);
    console.log(`POSTGRES_USER=${workingConfigs[0].user}`);
    console.log(`POSTGRES_DB=bulletin`);
    console.log(`POSTGRES_PASSWORD=${workingConfigs[0].password || ''}`);
    console.log(`POSTGRES_SCHEMA=shiwan_ceramics`);

    console.log('\n📝 下一步:');
    console.log('1. 如果 bulletin 数据库不存在，先创建它');
    console.log('2. 然后运行 schema 创建脚本');
  } else {
    console.log('\n❌ 无法连接到 PostgreSQL');
    console.log('\n可能的原因:');
    console.log('1. OrbStack PostgreSQL 容器未运行');
    console.log('2. 端口映射不正确（应该是 5432 -> 5433）');
    console.log('3. 需要检查 OrbStack 设置');
    console.log('\n建议:');
    console.log('- 打开 OrbStack，查看 PostgreSQL 容器状态');
    console.log('- 检查端口映射: docker ps (如果使用 Docker CLI)');
    console.log('- 确认容器正在运行');
  }

  process.exit(workingConfigs.length > 0 ? 0 : 1);
}

main();
