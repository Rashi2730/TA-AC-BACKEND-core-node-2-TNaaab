var http = require('http');

var server = http.createServer(handleReq);

function handleReq(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    console.log(store);
  });
  res.write(store);
}

server.listen(3456, () => {
  console.log('server listening to port 3456');
});
