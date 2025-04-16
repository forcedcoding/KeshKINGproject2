const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
});

app.listen(9000,()=>{
    console.log('Server started on port 9000');
});

//design book schema
const BookSchema = new mongoose.Schema({
    title : String,
    author : String,
    date : String,
    image : String
});

// design book model
const Book = mongoose.model('Book', BookSchema);

app.post('/books', async (req, res) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        res.status(200).json({ message: 'Book added successfully', book: savedBook });
    } catch (err) {
        res.status(500).json({ error: 'Error adding book', details: err.message });
    }
});
