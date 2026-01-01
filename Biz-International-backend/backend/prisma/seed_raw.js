// prisma/seed_raw.js
// Run: node prisma/seed_raw.js
require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcrypt');

function uuid() {
  return (typeof globalThis.crypto?.randomUUID === 'function')
    ? globalThis.crypto.randomUUID()
    : require('crypto').randomUUID();
}

async function main() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:pankaj12@localhost:5433/Biz';
  const client = new Client({ connectionString });

  await client.connect();
  console.log('Connected to DB');

  try {
    // Helper to run query and return rows
    const q = async (text, params = []) => {
      const res = await client.query(text, params);
      return res;
    };

    // 1) Create manager
    const managerEmail = 'manager@biz.com';
    const managerPassword = await bcrypt.hash('manager123', 10);
    let res = await q('SELECT id FROM "User" WHERE "email"=$1', [managerEmail]);
    let managerId;
    if (res.rowCount === 0) {
      managerId = uuid();
      await q(
        'INSERT INTO "User"(id,name,email,password,role,"createdAt") VALUES($1,$2,$3,$4,$5,NOW())',
        [managerId, 'Project Manager', managerEmail, managerPassword, 'MANAGER']
      );
      console.log('Manager created');
    } else {
      managerId = res.rows[0].id;
      console.log('Manager exists');
    }

    // 2) Create supervisor
    const supEmail = 'supervisor@biz.com';
    const supPassword = await bcrypt.hash('supervisor123', 10);
    res = await q('SELECT id FROM "User" WHERE "email"=$1', [supEmail]);
    let supervisorId;
    if (res.rowCount === 0) {
      supervisorId = uuid();
      await q(
        'INSERT INTO "User"(id,name,email,password,role,"createdAt") VALUES($1,$2,$3,$4,$5,NOW())',
        [supervisorId, 'Field Supervisor', supEmail, supPassword, 'SUPERVISOR']
      );
      console.log('Supervisor created');
    } else {
      supervisorId = res.rows[0].id;
      console.log('Supervisor exists');
    }

    // 3) Create project (if not exists)
    const projectName = 'Demo Construction Site';
    res = await q('SELECT id FROM "Project" WHERE "name"=$1', [projectName]);
    let projectId;
    if (res.rowCount === 0) {
      projectId = uuid();
      await q(
        'INSERT INTO "Project"(id,name,location,"createdAt","managerId") VALUES($1,$2,$3,NOW(),$4)',
        [projectId, projectName, 'Mumbai', managerId]
      );
      console.log('Project created');
    } else {
      projectId = res.rows[0].id;
      console.log('Project exists');
    }

    // 4) Create floors (1 & 2) if not present
    res = await q('SELECT id FROM "Floor" WHERE "projectId"=$1 AND "number"=1', [projectId]);
    let floor1Id;
    if (res.rowCount === 0) {
      floor1Id = uuid();
      await q('INSERT INTO "Floor"(id,"number","projectId") VALUES($1,$2,$3)', [floor1Id, 1, projectId]);
      console.log('Floor 1 created');
    } else {
      floor1Id = res.rows[0].id;
      console.log('Floor 1 exists');
    }

    res = await q('SELECT id FROM "Floor" WHERE "projectId"=$1 AND "number"=2', [projectId]);
    let floor2Id;
    if (res.rowCount === 0) {
      floor2Id = uuid();
      await q('INSERT INTO "Floor"(id,"number","projectId") VALUES($1,$2,$3)', [floor2Id, 2, projectId]);
      console.log('Floor 2 created');
    } else {
      floor2Id = res.rows[0].id;
      console.log('Floor 2 exists');
    }

    // 5) Create rooms on floor1
    res = await q('SELECT id FROM "Room" WHERE "floorId"=$1 AND "name"=$2', [floor1Id, 'Room 101']);
    let room101Id;
    if (res.rowCount === 0) {
      room101Id = uuid();
      await q('INSERT INTO "Room"(id,name,"floorId") VALUES($1,$2,$3)', [room101Id, 'Room 101', floor1Id]);
      console.log('Room 101 created');
    } else {
      room101Id = res.rows[0].id;
      console.log('Room 101 exists');
    }

    res = await q('SELECT id FROM "Room" WHERE "floorId"=$1 AND "name"=$2', [floor1Id, 'Room 102']);
    let room102Id;
    if (res.rowCount === 0) {
      room102Id = uuid();
      await q('INSERT INTO "Room"(id,name,"floorId") VALUES($1,$2,$3)', [room102Id, 'Room 102', floor1Id]);
      console.log('Room 102 created');
    } else {
      room102Id = res.rows[0].id;
      console.log('Room 102 exists');
    }

    // 6) Create doorFrame for Room 101
    res = await q('SELECT id FROM "DoorFrame" WHERE "roomId"=$1 LIMIT 1', [room101Id]);
    let df1Id;
    if (res.rowCount === 0) {
      df1Id = uuid();
      await q(
        'INSERT INTO "DoorFrame"(id,status,notes,"roomId") VALUES($1,$2,$3,$4)',
        [df1Id, 'PENDING', 'Initial installation not started', room101Id]
      );
      console.log('DoorFrame created');
    } else {
      df1Id = res.rows[0].id;
      console.log('DoorFrame exists');
    }

    // 7) Create Task for that doorFrame
    res = await q('SELECT id FROM "Task" WHERE "doorFrameId"=$1 AND "title"=$2', [df1Id, 'Install wooden frame']);
    let task1Id;
    if (res.rowCount === 0) {
      task1Id = uuid();
      await q(
        'INSERT INTO "Task"(id,title,status,"doorFrameId","assignedToId") VALUES($1,$2,$3,$4,$5)',
        [task1Id, 'Install wooden frame', 'OPEN', df1Id, supervisorId]
      );
      console.log('Task created');
    } else {
      task1Id = res.rows[0].id;
      console.log('Task exists');
    }

    // 8) Create Payment for that task
    res = await q('SELECT id FROM "Payment" WHERE "taskId"=$1 LIMIT 1', [task1Id]);
    if (res.rowCount === 0) {
      const paymentId = uuid();
      await q(
        'INSERT INTO "Payment"(id,amount,status,"taskId","createdAt") VALUES($1,$2,$3,$4,NOW())',
        [paymentId, 1500, 'PENDING', task1Id]
      );
      console.log('Payment created');
    } else {
      console.log('Payment exists');
    }

    console.log('Seed completed');
  } catch (err) {
    console.error('Seed error', err);
  } finally {
    await client.end();
    console.log('DB connection closed');
  }
}

main().catch((e) => {
  console.error('Fatal error', e);
  process.exit(1);
});
