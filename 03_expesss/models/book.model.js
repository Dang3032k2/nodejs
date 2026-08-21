const { varchar } = require("drizzle-orm/pg-core");
const { uuid } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model");
const { text } = require("drizzle-orm/pg-core");
const { index } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");

const booksTable = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
  },
  (table) => ({
    searchIndexOnTitle: index("title_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`,
    ),
  }),
);

module.exports = booksTable;
