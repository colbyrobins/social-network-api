const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomNames, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      console.log('dropping users');
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      console.log('dropping thoughts');
      await connection.dropCollection('thoughts');
    }

  // Create empty array to hold the students
  const users = [];

  // // Loop 20 times -- add students to the students array
  for (let i = 0; i < randomNames.length; i++) {

      const username = randomNames[i]
      const email = `${
        username.split(' ')[0]
      }${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`;
      
      // create thought and push to users array
      const thought = await Thought.create({
        thoughtText: thoughts[Math.floor(Math.random() * thoughts.length)],
        username,
      });

      users.push({
        username,
        email,
        thoughts: [thought._id],
      });
  }

  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
