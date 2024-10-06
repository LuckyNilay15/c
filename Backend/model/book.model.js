import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image_url: String,
    title: String,
    website: String
});
const Book = mongoose.model("books", bookSchema);

export default Book;