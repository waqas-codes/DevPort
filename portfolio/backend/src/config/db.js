const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Modern Mongoose handles these options by default, but it's good for clarity
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.error('TIP: Check your DNS settings or try using a older connection string (mongodb:// instead of mongodb+srv://)');
        }
        
        process.exit(1);
    }
};

module.exports = connectDB;
