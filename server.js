const { createServer } = require('node:http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.readFile('client/public/index.html',(error,data) => {
    if (error) {
        res.writeHead(404)
        res.write('Error: File not Found')
    } else {
        res.write(data)
    }
    res.end()
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
