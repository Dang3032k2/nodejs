const booksTable = require("../models/book.model");
const db = require("../db");
const { eq, sql, and } = require("drizzle-orm");
const { authorsTable } = require("../models");

exports.getAllBooks = async function (req, res) {
  const { search, authorId } = req.query;
  const conditions = [];
  if (search) {
    conditions.push(
      sql`to_tsvector('english', ${booksTable.title}) @@ websearch_to_tsquery('english', ${search})`,
    );
  }
  if (authorId) {
    conditions.push(eq(booksTable.authorId, authorId));
  }
  const books = await db
    .select()
    .from(booksTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;
  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1);
  if (!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists` });
  res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!authorId || authorId === "") {
    return res.status(400).json({ error: "Author is required" });
  }
  const [result] = await db
    .insert(booksTable)
    .values({ title, description, authorId })
    .returning({ id: booksTable.id });
  return res
    .status(201)
    .json({ message: "Book created success", id: result.id });
};

exports.deleteBookById = async function (req, res) {
  const id = req.params.id;
  await db.delete(booksTable).where(eq(booksTable.id, id));
  return res.json({ message: "Book deleted success" });
};
