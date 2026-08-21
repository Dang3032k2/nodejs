const express = require("express");
const controller = require("../controllers/author.controller");

const router = express.Router();

router.get("/", (req, res) => {
  controller.getAllAuthors(req, res);
});

router.get("/:id", (req, res) => {
  controller.getAuthorById(req, res);
});

router.post("/", (req, res) => {
  controller.createAuthor(req, res);
});

router.put("/:id", (req, res) => {
  controller.updateAuthor(req, res);
});

router.delete("/:id", (req, res) => {
  controller.deleteAuthor(req, res);
});

module.exports = router;
