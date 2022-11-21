var http = require('http');
var fs = require('fs');
var server = http.createServer(handleReq);

function handleReq(req, res) {
  if (req.method === 'GET' && req.url === '/form') {
    res.setHeaders('content-type', 'text/html');
    fs.createReadStream('./form.html').pipe(res);
  } else if (req.method === 'POST' && req.url === '/form') {
    res.setHeaders('content-type', 'text/html');
    fs.createReadStream('./form.html').pipe(res);
  }
}

server.listen(5678, () => {
  console.log('server listening to port 5678');
});
