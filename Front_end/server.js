const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'html_files')));
app.use('/css_files', express.static(path.join(__dirname, 'css_files')));
app.use('/Js_files', express.static(path.join(__dirname, 'Js_files')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'ACT4CLIMATE';

// Function to connect to MongoDB
const connectToDB = async () => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    return db;
};

// Route to handle form submission
app.post('/submit-story', async (req, res) => {
    const { name, email, story } = req.body;

    const db = await connectToDB();
    const collection = db.collection('stories');

    // Insert form data into the collection
    await collection.insertOne({ name, email, story });
    res.send('Story submitted successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
