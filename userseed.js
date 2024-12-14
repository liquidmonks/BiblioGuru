import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// User model schema
const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String, required: true},
    role: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);

// Seed data
const seedUsers = async () => {
    try {
        // Clear the existing users collection
        await User.deleteMany();

        // Hash passwords
        const adminPassword = await bcrypt.hash('password123', 10);
        const userPassword = await bcrypt.hash('password123', 10);

        // Insert users
        const users = [
            {
                username: 'admin',
                password: adminPassword,
                role: 'admin',
            },
            {
                email: 'john.doe@gmail.com',
                password: userPassword,
                role: 'user',
            },
        ];

        await User.insertMany(users);

        console.log('Users seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

// Execute seeding
const seedDatabase = async () => {
    await connectDB();
    await seedUsers();
};

seedDatabase();
