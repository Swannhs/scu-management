const http = require('http');
const port = process.env.PORT || 3000;
const serviceName = process.env.SERVICE_NAME || 'node-service';

const requestListener = (req, res) => {
  const response = {
    service: serviceName,
    path: req.url,
    message: 'Stub service running. Replace with framework implementation.',
  };
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(response));
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`${serviceName} listening on port ${port}`);
});
