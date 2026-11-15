/**
 * Social Media Quick Seeder (No Cloudinary Required)
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URI = 'mongodb://localhost:27017/connectverse';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to connectverse MongoDB...');

  const db = mongoose.connection.db;
  const usersCol = db.collection('users');
  const postsCol = db.collection('posts');

  const existingUsers = await usersCol.countDocuments();
  if (existingUsers === 0) {
    const passwordHash = await bcrypt.hash('Password@123', 10);
    const user1 = await usersCol.insertOne({
      username: 'alex_tech',
      email: 'alex@example.com',
      password: passwordHash,
      fullName: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      bio: 'Full-stack developer building modern MERN apps.',
      followers: [],
      following: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const user2 = await usersCol.insertOne({
      username: 'sarah_design',
      email: 'sarah@example.com',
      password: passwordHash,
      fullName: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
      bio: 'UI/UX Designer passionate about minimal interfaces.',
      followers: [],
      following: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await postsCol.insertMany([
      {
        author: user1.insertedId,
        content: 'Excited to announce our new unified MERN stack enterprise suite! All 5 platforms working seamlessly together 🚀',
        media: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'],
        likes: [user2.insertedId],
        commentsCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: user2.insertedId,
        content: 'Design review completed for the new dashboard. Love the clean glassmorphic design and dark mode aesthetic! ✨',
        media: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800'],
        likes: [user1.insertedId],
        commentsCount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log('✅ Successfully seeded demo users and posts into MongoDB connectverse!');
  } else {
    console.log('Users already present in connectverse.');
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed();

