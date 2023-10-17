import express from 'express';
import {port, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome!")
});

app.use('/books', booksRoute);

// //Route for save a new book
// app.post('/books', async (req,res) => {
//     try{
//         if(
//             !req.body.title ||
//             !req.body.author ||
//             !req.body.publishYear
//         ){
//             return res.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear'
//             });
//         }
//         const newBook = {
//             title: req.body.title, 
//             author: req.body.author,
//             publishYear: req.body.publishYear
//         };
//         const book = await Book.create(newBook);
//         return res.status(201).send(book);
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message: error.message})
//     }
// });

// //Route for getting all books from database
// app.get('/books', async(req,res) => {
//     try{
//         const books = await Book.find({});
//         return res.status(200).json({
//             count : books.length,
//             data: books
//         });
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message: error.message})
//     }
// })

// //Route for getting all books from database by Id
// app.get('/books/:id', async(req,res) => {
//     try{
//         const {id} = req.params;
//         const book = await Book.findById(id);
//         return res.status(200).json(book);
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message: error.message})
//     }
// })

// //Route for update a book
// app.put('/books/:id', async (req,res) => {
//     try{
//         if(
//             !req.body.title ||
//             !req.body.author ||
//             !req.body.publishYear
//         ){
//             return res.status(400).send({
//                 message: 'Send all required fields: title, author, publishYear'
//             });
//         }
//         const {id} = req.params;
//         const result = await Book.findByIdAndUpdate(id, req.body);
//         if(!result){
//             return res.status(404).json({message:"Book not found"})
//         }
//         return res.status(200).send({message:"Book updated successfully!"})
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message: error.message})
//     }
// });

// // Route for Delete a book 
// app.delete('/books/:id', async(req,res) =>{
//     try{
//         const {id} = req.params;
//         const result = await Book.findByIdAndDelete(id);
//         if(!result){
//             return res.status(404).json({message:"Book not found"})
//         }
//         return res.status(200).send({message : "Book Deleted Successfully"})
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message})
//     }
// })

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(port, ()=>{
            console.log(`Server running on port http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });