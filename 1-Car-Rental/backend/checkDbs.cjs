const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://127.0.0.1:27017';
const DBS = [
  'omnisphere_car_rental',
  'stayeasy',
  'shopnow',
  'connectverse',
  'yummix'
];

async function main() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log('====================================================');
  console.log('✅ Connected to MongoDB at ' + MONGO_URL);
  console.log('====================================================\n');

  for (const dbName of DBS) {
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    let totalDocs = 0;
    const details = [];
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      totalDocs += count;
      details.push(`${col.name}: ${count}`);
    }
    console.log(`📦 Database [${dbName}] -> Collections: ${collections.length}, Total Documents: ${totalDocs}`);
    if (details.length > 0) {
      console.log(`   Collections breakdown: ${details.join(', ')}`);
    } else {
      console.log(`   ⚠️ NO COLLECTIONS FOUND (Empty DB)`);
    }
    console.log('----------------------------------------------------');
  }

  await client.close();
}

main().catch(err => {
  console.error('Error checking databases:', err);
  process.exit(1);
});

