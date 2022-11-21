var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var path = require('path');

let server = http.createServer(handleServer);
server.listen(3000, () => {
  console.log(`Server listening to port 3000`);
});

function handleServer(req, res) {
  let store = '';
  //directory where all users will be stored
  const userDir = __dirname + '/users/';

  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    let parsedUrl = url.parse(req.url).pathname;
    if (parsedUrl === '/users') {
      if (
        req.method === 'POST' &&
        req.headers['content-type'] === 'application/json'
      ) {
        var username = JSON.parse(store).username;
        fs.open(userDir + username + '.json', 'wx', (err, fd) => {
          fs.writeFile(fd, store, (err) => {
            fs.close(fd, (err) => {
              res.end(`${username} successfully created`);
            });
          });
        });
      } else if (req.method === 'GET') {
        let query = qs.parse(url.parse(req.url).query);
        let file_path = path.join(__dirname, 'users', query.username + '.json');
        console.log(file_path);

        fs.readFile(file_path, (err, user) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(user);
        });
      } else if (req.method === 'DELETE') {
        let query = qs.parse(url.parse(req.url).query);
        let file_path = path.join(__dirname, 'users', query.username + '.json');
        console.log(file_path);

        //unlink
        fs.unlink(file_path, (err, user) => {
          res.end(`user ${query.username} is removed`);
        });
      } else if (req.method === 'PUT') {
        let query = qs.parse(url.parse(req.url).query);
        let file_path = path.join(__dirname, 'users', query.username + '.json');
        console.log(file_path);
        fs.open(file_path, 'r+', (err, fd) => {
          fs.ftruncate(fd, (err) => {
            if (err) return console.log(err);
            fs.writeFile(fd, store, (err) => {
              if (err) return console.log(err);
              fs.close(fd, () => {
                res.end(`${username} successfully Updated`);
              });
            });
          });
        });
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end(`<h2>Error 404 : PAge not found</h2>`);
      }
    }
  });
}
