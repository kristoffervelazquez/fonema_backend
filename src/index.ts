import "dotenv/config";
import Server from "./core/server";
const main = () => {
  const server = new Server({
    port: process.env.PORT || "3000",
    host: process.env.HOST || "localhost",
  });
  server.listen();
};
main();
