const { varchar } = require("drizzle-orm/pg-core");
const { uuid } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");

const booksTable = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  description: text(),
  authorId: uuid()
    .references(() => authorsTable.id)
    .notNull(),
});

module.exports = authorsTable;
