// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require("fastify")();
// #2 TODO: Declare fetch object from node-fetch
const fetch = require("node-fetch");

fastify.get("/photos", (request, reply) => {
  
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((res) => {
      return res.json();
    })
    .then((jsonFromResponse) => {
      reply
        .code(200)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 200, photos: jsonFromResponse });
    })
    .catch((err) => {
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 404, photos: [] });
    });
});

fastify.get("/photos/:id", (request, reply) => {
  const { id = "" } = request.params;
  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((jsonFromResponse) => {
      reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<html><body><h1>${jsonFromResponse.title}</h1><img src='${jsonFromResponse.url}'/></body></html>`);
    })
    .catch((err) => {
      reply
        .code(404)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({ error: "", statusCode: 404, photos: [] });
    });
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
