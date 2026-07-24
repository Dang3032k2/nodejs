const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  const method = req.method;
  const path = req.url;
  fs.appendFile(
    "./log.txt",
    `Time: ${Date.now()} - Request: ${method} , ${path}\n*******\n`,
    () => {},
  );
  switch (method) {
    case "GET":
      switch (path) {
        case "/":
          res.writeHead(200);
          return res.end("Hello! This is homepage");
        case "/contact-us":
          res.writeHead(200);
          return res.end(`Email: abc@gmail.com \nPhone number: +84976264567`);
        case "/tweet":
            return res.writeHead(200).end("tweet1\n tweet2");
          
      }
      break
    case "POST":
      switch (path) {
        case "/tweet":


      }
  }
  return res.writeHead(404).end("Not found");
});

server.listen(8000, () => console.log("running on port 8000"));
