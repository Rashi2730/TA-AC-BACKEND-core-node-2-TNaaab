var http = require('http');
var fs = require('fs');
var server = http.createServer(handleReq);

function handleReq(req, res) {
  fs.createReadStream;
}
server.listen('3000', () => {
  console.log('server listening to port 3000');
});
