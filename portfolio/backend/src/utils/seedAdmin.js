const User = require('../models/User');

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
        const adminPassword = process.env.ADMIN_PASSWORD || '123456';

        // Delete existing admin with same email to ensure fresh start with hashed password
        await User.deleteMany({ email: adminEmail });

        // Use create() to trigger pre('save') middleware for hashing
        await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });

        console.log(`Admin user ${adminEmail} created/reset with secure hashing.`);
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

module.exports = seedAdmin;
