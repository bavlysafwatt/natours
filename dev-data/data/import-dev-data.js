const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tour.model');
const Review = require('./../../models/review.model');
const User = require('./../../models/user.model');

dotenv.config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then((con) => {
    console.log('DB connection successful!');
}).catch((err) => {
    console.error('DB connection failed!');
});

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        await Review.create(reviews);
        await User.create(users, { validateBeforeSave: false });
        console.log('Data successfully loaded!');
    } catch (err) {
        console.error(`Error loading data: ${err.message}`);
    }
    process.exit();
}

// Delete all data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.error(`Error deleting data: ${err.message}`);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else {
    console.log('Invalid command. Use --import to import data or --delete to delete data.');
    process.exit();
}

console.log(process.argv);