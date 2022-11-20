var http = require('http');

var server = http.createServer(handleReq);

function handleReq(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    res.write(store);
    res.end();
  });
}

server.listen(3456, () => {
  console.log('server listening to port 3456');
});
