const express = require("express");
const controller = require("../controllers/book.controller");
const router = express.Router();

router.get("/", (req, res) => {
  controller.getAllBooks(req, res);
});

router.get("/:id", (req, res) => {
  controller.getBookById(req, res);
});

router.post("/", (req, res) => {
  controller.createBook(req, res);
});

router.delete("/:id", (req, res) => {
  controller.deleteBookById(req, res);
});

module.exports = router;
