const server = require('./api/server.js');

port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server up and running on port ${port}`);
});
