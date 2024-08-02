const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'html_files')));
app.use('/css_files', express.static(path.join(__dirname, 'css_files')));
app.use('/js_files', express.static(path.join(__dirname, 'js_files')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB connection URL and database name
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'ACT4CLIMATE';

// Function to connect to MongoDB
const connectToDB = async () => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    return db;
};

// Route to fetch stories from the database
app.get('/stories', async (req, res) => {
    const db = await connectToDB();
    const collection = db.collection('stories');

    // Fetch all stories from the collection
    const stories = await collection.find().toArray();

    // Send stories as a response
    res.status(200).json(stories);
});

// Route to handle form submission
app.post('/submit-story', async (req, res) => {
    const { name, email, story } = req.body;

    const db = await connectToDB();
    const collection = db.collection('stories');

    // Insert form data into the collection
    await collection.insertOne({ name, email, story });

    // Send a success response
    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
