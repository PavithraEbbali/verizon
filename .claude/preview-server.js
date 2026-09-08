// Zero-dependency static server for local preview. Serves the project root.
// Used by .claude/launch.json. You can also just run: npx serve .
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = process.env.PORT || 4322;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      let filePath = path.join(ROOT, urlPath);
      if (!path.resolve(filePath).startsWith(path.resolve(ROOT))) {
        res.writeHead(403);
        return res.end("Forbidden");
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("Not found: " + urlPath);
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          "Content-Type": TYPES[ext] || "application/octet-stream",
          "Cache-Control": "no-store, must-revalidate",
        });
        res.end(data);
      });
    } catch (e) {
      res.writeHead(500);
      res.end("Server error");
    }
  })
  .listen(PORT, () => console.log("Preview on http://localhost:" + PORT));
