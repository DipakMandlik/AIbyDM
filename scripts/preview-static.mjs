import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const port = Number(process.env.PORT ?? 4173);
const host = "127.0.0.1";
const root = path.resolve("out");
const basePath = process.env.BASE_PATH ?? "/AIByDM";
const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

createServer((request, response) => {
  const rawPath = decodeURI((request.url ?? "/").split("?")[0]);
  const routePath = rawPath.startsWith(basePath) ? rawPath.slice(basePath.length) || "/" : rawPath;
  let filePath = path.join(root, routePath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    filePath = path.join(root, "404", "index.html");
  }

  response.writeHead(200, {
    "content-type": contentTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`Static preview running at http://${host}:${port}${basePath}/`);
});
