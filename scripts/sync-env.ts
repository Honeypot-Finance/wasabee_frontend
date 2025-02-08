import dotenv from "dotenv";
dotenv.config();
import { pg } from "../lib/db";
import fs from "fs/promises";
import path from "path";

async function syncConfigFromDB() {
  try {
    // 检查config表是否存在
    const tableExists = await pg`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'config'
      );
    `;
    // 如果表不存在，创建表
    if (!tableExists[0].exists) {
      await pg`
        CREATE TABLE config (
          key VARCHAR(255) PRIMARY KEY,
          value TEXT NOT NULL
        );
      `;
      console.log('config表创建成功！');
    }
    
    // 从config表中查询所有配置
    const result = await pg`SELECT key, value FROM config`   
    // 将结果转换为对象
    const config = result.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    console.log('数据库中的配置:', config);
    
    // 读取现有的配置文件
    const configPath = path.resolve(__dirname, '../generate/config.json');
    let existingConfig = {};
    try {
      const existingContent = await fs.readFile(configPath, 'utf8');
      existingConfig = JSON.parse(existingContent);
      console.log('现有的配置:', existingConfig);
    } catch (error) {
      // 如果文件不存在或解析失败，使用空对象
      console.log('没有找到现有配置文件或解析失败');
    }

    // 比较配置是否相同
    if (JSON.stringify(config) === JSON.stringify(existingConfig)) {
      console.log('配置没有变化，无需更新');
      return;
    }

    // 配置有变化，写入新的配置
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log('配置已更新！');
  } catch (error) {
    console.error('同步配置时发生错误:', error);
    process.exit(1);
  }
}

// 执行同步
syncConfigFromDB();