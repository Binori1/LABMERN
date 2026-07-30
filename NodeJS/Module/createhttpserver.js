let http = require("http");
let server = http.createServer(function(req,res){
 res.writeHead(200, {"content-type" : "text/plain"})
res.end('Hellow Worlds!\n');
});

server.listen(PORT=3000, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});


const http = require('http');

const server = http.createServer((req, res) => {
  // Get the URL and HTTP method
  const { url, method } = req;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`You made a ${method} request to ${url}`);
});

server.listen(PORT = 3000, () => {
  console.log('Server running at http://localhost:3000/');
});