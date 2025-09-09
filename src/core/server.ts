import cors from "cors";
import express, { Application } from "express";
import transcriptsRouter from "../app/transcript/transcriptsRouter";
import db from "../config/db/sqlite";

class Server {
  private app: Application;
  public port: string;
  private host: string;
  private routes: Record<string, string> = {
    global: "/api/",
    transcripts: "/api/transcript",
  };

  constructor({ port, host }: { port: string; host: string }) {
    this.app = express();
    this.middlewares();
    this.routing();
    this.connectDB();
    this.port = port;
    this.host = host;
  }

  routing = () => {
    this.app.get(this.routes.global, (req, res) => {
      res.status(200).json({ message: "Hello World" });
    });
    this.app.use(this.routes.transcripts, transcriptsRouter);
  };

  connectDB = async () => {
    try {
      db.pragma("journal_mode = WAL");
      console.log("SQLite Database connected successfully.");
    } catch (error) {
      console.error("Failed to connect to SQLite Database:", error);
    }
  };

  listen = () => {
    this.app.listen(this.port, () => {
      console.log(
        `Server is running on port ${this.port} URL: http://${this.host}:${this.port}`
      );
    });
  };

  middlewares = () => {
    this.app.use(cors());
    this.app.use(express.json());
  };
}

export default Server;
