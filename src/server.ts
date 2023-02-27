import express, { Application, json } from "express";

import * as http from "http";

import morgan from "morgan";

// Swagger Implementation
import swaggerDocs from "./docs/swagger";

export const app = express();

export default class Server {
  //Load router
  router(routes: (app: Application) => void) {
    routes(app);
    return this;
  }
  //Listen server
  listen(port: number, hostname: string): Application {
    //apply global middlewares
    app.use(morgan("dev"));
    app.use(json());

    http.createServer(app).listen(port, hostname, () => {
      console.log(`⭐Server running and listen on http://${hostname}:${port} `);
      swaggerDocs(app);
    });
    return app;
  }
}
