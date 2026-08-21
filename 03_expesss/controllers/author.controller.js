const { eq } = require("drizzle-orm");
const db = require("../db");
const { authorsTable, booksTable } = require("../models");

exports.getAllAuthors = async (req, res) => {
  const authors = await db.select().from(authorsTable);
  return res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const id = req.params.id;
  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id))
    .limit(1);
  if (!author) {
    return res
      .status(404)
      .json({ error: `Author with id ${id} does not exists` });
  }
  return res.json(author);
};

exports.createAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || firstName === "") {
    return res.status(400).json({ error: "First name is required" });
  }
  if (!email || email === "") {
    return res.status(400).json({ error: "Email is required" });
  }
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const existingAuthor = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.email, email))
    .limit(1);
  if (existingAuthor.length > 0) {
    return res.status(409).json({ error: "Email already exist" });
  }
  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: booksTable.id });
  return res
    .status(201)
    .json({ message: "Author added successfully", id: result.id });
};

exports.updateAuthor = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email } = req.body;
  if (!firstName || firstName === "") {
    return res.status(400).json({ error: "First name is required" });
  }
  if (!email || email === "") {
    return res.status(400).json({ error: "Email is required" });
  }
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const existingAuthor = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.email, email))
    .limit(1);
  if (existingAuthor.length > 0) {
    return res.status(409).json({ error: "Email already exist" });
  }
  const [author] = await db
    .update(authorsTable)
    .set({ firstName, lastName, email })
    .where(eq(authorsTable.id, id))
    .returning();
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  return res.json(author);
};

exports.deleteAuthor = async (req, res) => {
  const id = req.params.id;
  await db.delete(authorsTable).where(eq(authorsTable.id, id));
  return res.json("Author deleted successfully");
};
