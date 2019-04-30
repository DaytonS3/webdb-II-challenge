const server = require("./server");

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== web API Listening on http://localhost:${port} ===\n`);
});
