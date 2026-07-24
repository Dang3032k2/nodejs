const { books } = require("../models/book");

exports.getAllBooks = function (req, res) {
  res.json(books);
};

exports.getBookById = function (req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }
  const book = books.find((e) => e.id === id);
  if (!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists` });
  res.json(book);
};

exports.createBook = function (req, res) {
  const { title, author } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "title is required" });
  }
  if (!author || author === "") {
    return res.status(400).json({ error: "author is required" });
  }
  const book = { id: books.length + 1, title, author };
  books.push(book);
  return res.status(201).json({ message: "Book created success" });
};

exports.deleteBookById = function (req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }
  const indexToDelete = books.findIndex((e) => e.id === id);
  if (indexToDelete < 0) {
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists` });
  }
  books.splice(indexToDelete, 1);
  return res.json({ message: "Book deleted success" });
};
