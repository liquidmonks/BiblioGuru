const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

const uri = 'MONGO_URI=mongodb+srv://biblioadmin:<password>@bibliogurucluster.algnq.mongodb.net/?retryWrites=true&w=majority&appName=BiblioGuruCluster\n'; // Replace with your MongoDB URI
const dbName = 'biblioguru'; // Replace with your database name

async function addAdminUser() {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('users');

        const username = 'admin';
        const plainPassword = 'password123';
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        console.log('Hashed password:', hashedPassword);

        const user = {
            username: username,
            password: hashedPassword
        };

        const result = await collection.insertOne(user);
        console.log('Admin user inserted with _id:', result.insertedId);
    } catch (err) {
        console.error('Error inserting admin user:', err);
    } finally {
        await client.close();
    }
}

addAdminUser().catch(console.error);
