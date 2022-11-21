var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var server = http.createServer(handleReq);

function handleReq(req, res) {
  var store = '';
  req
    .on('data', (chunk) => {
      store = store + chunk;
    })
    .on('end', () => {
      if (req.method === 'GET' && req.url === '/form') {
        res.setHeader('content-type', 'text/html');
        fs.createReadStream('./form.html').pipe(res);
      } else if (req.method === 'POST' && req.url === '/form') {
        var parsedData = qs.parse(store);
        res.setHeader('content-type', 'text/html');
        res.write(`<h2>${parsedData.name}</h2>`);
        res.write(`<h3>${parsedData.email}</h3>`);
        res.write(`<p>${parsedData.age}</p>`);
        res.end();
      }
    });
}

server.listen(5678, () => {
  console.log('server listening to port 5678');
});
