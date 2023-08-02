const http = require("http");
const geoip = require("geoip-lite");

const hostname = "127.0.0.1";
const port = 5001;

const parseIp = (req) =>
  req.headers["x-forwarded-for"]?.split(",").shift() ||
  req.socket?.remoteAddress;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const ip = parseIp(req);
  const country = geoip.lookup(ip);
  res.write(JSON.stringify({ ip, countryCode: country?.country }));
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
