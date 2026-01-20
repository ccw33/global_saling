const { Client } = require('pg');

// 测试不同的端口配置
const configs = [
  { host: 'localhost', port: 5432, user: 'yuanyuan', database: 'postgres' },
  { host: 'localhost', port: 5433, user: 'yuanyuan', database: 'postgres' },
  { host: 'localhost', port: 5432, user: 'postgres', database: 'postgres' },
  { host: 'localhost', port: 5433, user: 'postgres', database: 'postgres' },
  { host: 'localhost', port: 5432, user: 'bulletin', database: 'bulletin', password: 'bulletin' },
  { host: 'localhost', port: 5433, user: 'bulletin', database: 'bulletin', password: 'bulletin' },
];

async function testConnection(config, index) {
  const client = new Client(config);

  try {
    await client.connect();
    const result = await client.query('SELECT version()');
    await client.end();

    console.log(`✅ 配置 ${index + 1} 成功:`);
    console.log(`   主机: ${config.host}:${config.port}`);
    console.log(`   用户: ${config.user}`);
    console.log(`   数据库: ${config.database}`);
    console.log(`   版本: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    console.log('');
    return config;
  } catch (err) {
    // Connection failed silently
    await client.end().catch(() => {});
    return null;
  }
}

async function main() {
  console.log('🔍 检测 PostgreSQL 配置...\n');

  let workingConfig = null;

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    process.stdout.write(`测试配置 ${i + 1}/${configs.length} (${config.host}:${config.port}, ${config.user})... `);

    const result = await testConnection(config, i);

    if (result) {
      workingConfig = result;
      console.log(`✅ 找到可用配置！\n`);
      break;
    } else {
      console.log(`❌ 失败`);
    }
  }

  if (workingConfig) {
    console.log('🎯 推荐配置:');
    console.log(`POSTGRES_HOST=${workingConfig.host}`);
    console.log(`POSTGRES_PORT=${workingConfig.port}`);
    console.log(`POSTGRES_USER=${workingConfig.user}`);
    console.log(`POSTGRES_DB=${workingConfig.database || 'bulletin'}`);
    console.log(`POSTGRES_PASSWORD=${workingConfig.password || 'bulletin'}`);
    console.log(`POSTGRES_SCHEMA=shiwan_ceramics`);
  } else {
    console.log('\n❌ 无法连接到 PostgreSQL');
    console.log('\n请检查:');
    console.log('1. PostgreSQL 是否已安装: brew install postgresql@16');
    console.log('2. PostgreSQL 是否运行: brew services start postgresql@16');
    console.log('3. 防火墙设置');
  }

  process.exit(workingConfig ? 0 : 1);
}

main();
