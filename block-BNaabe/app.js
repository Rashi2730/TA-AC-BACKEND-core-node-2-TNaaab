var http = require('http');
var qs = require('querystring');
var server = http.createServer(handleReq);

function handleReq(req, res) {
  var store = '';
  var dataFormat = req.headers['content-type'];
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      var parseddata = JSON.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${parseddata.name}</h2><p>${parseddata.email}</p>`);
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      var parseddata = qs.parse(store);
      res.end(JSON.stringify(parseddata));
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${parseddata.email}</h2>`);
    }
  });
}

server.listen(9000, () => {
  console.log('server listening to port 9k');
});
