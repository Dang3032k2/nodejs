require("dotenv/config");
const express = require("express");
const { error, timeLog } = require("node:console");

const { loggerMiddleware } = require("./middlewares/logger");
const bookRouter = require("./routes/book.routes");
const authorRouter = require("./routes/author.routes");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(loggerMiddleware);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
