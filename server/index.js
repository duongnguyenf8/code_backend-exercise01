const http = require("http");
const url = require("url");
const data = require("../data/data.json");
const { html, assets } = require("../modal/home.js");

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      const parsedUrl = url.parse(req.url, true);
      const { pathname } = parsedUrl;

      if (pathname === "/") {
        // http://localhost:3000/
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html(res, "index.html", data));
      } else if (pathname.startsWith("/assets")) {
        // assets/style.css; assets/script.js...
        res.end(assets(res, "../views", pathname));
      } else {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1><b>404</b> Not Found</h1>");
      }
    } else {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Phương thức không được hỗ trợ");
    }
  })
  .listen(3002);
