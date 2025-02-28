const http =require('http');

const requestHandler=require('./ir1')
const server =http.createServer(requestHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
