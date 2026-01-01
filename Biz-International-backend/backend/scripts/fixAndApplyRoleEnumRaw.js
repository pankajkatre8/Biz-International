// scripts/fixAndApplyRoleEnumRaw.js
const { Client } = require('pg');

async function main() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:pankaj12@localhost:5433/Biz';
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('Connected to DB. Normalizing role values...');

    // 1) Normalize: trim + uppercase
    await client.query(`UPDATE "User" SET role = UPPER(TRIM(role));`);

    // 2) Map known legacy variants to the two allowed values
    await client.query(`UPDATE "User" SET role = 'MANAGER' WHERE role IN ('ADMIN','HEAD','OWNER','MANAGER');`);
    await client.query(`UPDATE "User" SET role = 'SUPERVISOR' WHERE role IN ('USER','WORKER','EMPLOYEE','OPERATOR','SUP');`);

    console.log('Normalization complete. Current distinct roles:');
    const res = await client.query(`SELECT role, count(*) FROM "User" GROUP BY role ORDER BY role;`);
    console.table(res.rows);

    // 3) Create enum if not exists
    console.log('Creating Role enum if not present...');
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
          CREATE TYPE "Role" AS ENUM ('MANAGER','SUPERVISOR');
        END IF;
      END$$;
    `);

    // 4) Alter column to enum type
    console.log('Altering "User".role column to enum type "Role"...');
    await client.query(`
      ALTER TABLE "User"
        ALTER COLUMN role TYPE "Role"
        USING role::"Role";
    `);

    console.log('Enum created and column altered successfully.');
  } catch (err) {
    console.error('Error during process:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
