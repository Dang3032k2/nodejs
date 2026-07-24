const fs = require("node:fs");
const content = fs.readFileSync("note.txt", "utf-8");
// fs.appendFileSync("copy.txt", "\nhey", "utf-8");
console.log(content);
// fs.mkdirSync("games/xyz", { recursive: true });
// fs.rmdirSync('games')
fs.unlinkSync('copy.txt')