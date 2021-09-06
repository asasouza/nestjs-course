
import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', '..', process.env.DB_NAME));
  } catch (error) {}
});

global.afterEach(async () => {
    const connection = await getConnection();
    await connection.close();
})