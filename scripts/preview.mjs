import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  jpg: 'image/jpeg',
  xml: 'application/xml; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const base = resolve(root, '.' + pathname.replace(/\/$/, ''));
    if (base !== root && !base.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    const candidates = base === root ? [resolve(root, 'index.html')] : [base, base + '.html'];
    for (const file of candidates) {
      const info = await stat(file).catch(() => null);
      if (!info?.isFile()) continue;
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': mime[file.split('.').at(-1)] ?? 'application/octet-stream' });
      response.end(body);
      return;
    }
    response.writeHead(404, { 'Content-Type': mime.html });
    response.end(await readFile(resolve(root, '404.html')));
  } catch {
    if (!response.headersSent) response.writeHead(500);
    response.end();
  }
}).listen(port, '127.0.0.1', () => process.stdout.write('http://127.0.0.1:' + port + '\n'));
