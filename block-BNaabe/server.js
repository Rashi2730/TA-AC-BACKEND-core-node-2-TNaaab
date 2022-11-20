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
      res.end(store);
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      var parseddata = qs.parse(store);
      res.end(JSON.stringify(parseddata));
    }
  });
}

server.listen(7000, () => {
  console.log('server listening to port 7k');
});
