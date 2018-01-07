import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './routes/api';
import * as config from './config'
import models from './models'
import laravelRouter from 'express-laravel-router';
import ErrorHandler from './exceptions/handler'

/**
 * Main Application
 */
class Aplication {

  /**
   * Init Express App
   */
  init() {
    this.app = express();
    this.app.server = http.createServer(this.app);
    this.registerMainMiddleware()
    .registerRouter()
    .regiterErrorHandler();
    return this;
  }
  /**
   * Init and Start the Express app
   */
  start() {
    this.init().run();
  }
  /**
   * Register core middleware
   */
  registerMainMiddleware() {
    this.app.use(cors({
      exposedHeaders: config.corsHeaders
    }));

    this.app.use(bodyParser.json({
      limit : config.bodyLimit
    }));

    // internal middleware
    this.app.use(middleware());
    return this;
  }
  /**
   * Register router
   */
  registerRouter() {
    // api router
    const mapActionToHandler = (action, routeDescription, routeOptions) => {
      return action.handle;
    };

    this.router = laravelRouter.createRouter(this.app, mapActionToHandler);

    this.router.group('/api', api);
    return this;
  }
  /**
   * Register Error Handler
   */
  regiterErrorHandler() {
    this.app.use((err, req, res, next) => {
      const handler = new ErrorHandler;
      handler.handle(err, req, res);
    });
    return this;
  }
  /**
   * Run the App
   */
  run() {
    // start of the server
    if ( process.env.NODE_ENV == "testing" ) {
      models.sync().catch(err => console.error(err.stack)).then(() => {
        this.app.server.listen(config.appPort, () => {
          console.log(`Started on port ${this.app.server.address().port}`);
        });
      });	
    } else {
      this.app.server.listen(config.appPort, () => {
        console.log(`Started on port ${this.app.server.address().port}`);
      });
    }
  }

}

export default Aplication;