const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express(); // create instance

require('dotenv').config();//handles env

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true }, () => {
    console.log("DB connected")
}) //added useNewUrlParser to avoid deprecation warning

app.use(bodyParser.json());

const Book = require('./booksModel');

app.get('/', (req, res) => {
    res.send("This is books server");
})

app.get('/books.list', async (req, res) => {

    try {
        const books = await Book.find();

        res.json(books);
    } catch (err) {
        console.log(err);
    }
})

app.get('/books.find/:id', async (req, res) => {
    try {
        console.log("Id=", req.params.id);

        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const book = await Book.findById(mongoose.Types.ObjectId(req.params.id));
            console.log("BOOK=", book);

            if (book) {
                res.send(book);
            } else {
                res.send("Book not found!")
            }
    
        } else {
            res.send("Error! this is not a valid Book id!").status(400);
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/book', async (req, res) => {
    console.log("req=", req.body);

    try{
        let newBook = {
            title: req.body.title,
            author: req.body.author,
            numOfPages: req.body.numOfPages,
            publisher: req.body.publisher
        }
    
        let book = new Book(newBook);
        await book.save(book);
        
        res.send("New book saved");  
    } catch(error) {
        console.log("BOOK SAVE error:", error);
    }
})

app.delete('/books.remove/:id', async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const book = await Book.findOneAndRemove(mongoose.Types.ObjectId(req.params.id));
            console.log("BOOK=", book);

            if (book) {
                res.send("Successfully deleted!");
            } else {
                res.send("Book not found!")
            }
    
        } else {
            res.send("Error! this is not a valid Book id!").status(400);
        }
    } catch (error) {
        console.log(error)
    }
})
app.listen(4545, () => console.log("Server is up and listening at port 4545"));