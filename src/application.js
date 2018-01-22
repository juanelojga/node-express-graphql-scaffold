import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import api from './routes/api'
import * as config from './config'
import models from './models'
import laravelRouter from 'express-laravel-router'
import ErrorHandler from './exceptions/handler'
import passportJwtStrategy from './passport/jwt'
import passport from 'passport'
import schema from './schema'
import { graphqlExpress } from 'apollo-server-express';
import authenticate from './passport/authenticate'

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
    this.registerCoreMiddleware()
    .registerRouter()
    .registerApiRoutes()
    .registerGraphQl()
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
  registerCoreMiddleware() {
    
    passport.use(passportJwtStrategy);

    this.app.use(cors({
      exposedHeaders: config.corsHeaders
    }));

    this.app.use(bodyParser.json({
      limit : config.bodyLimit
    }));

    this.app.use(passport.initialize());

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

    return this;
  }
  /**
   * Register API Routes
   */
  registerApiRoutes() {
    this.router.group('/api', api);
    return this;
  }
  /**
   * Register GraphQL endpoints
   */
  registerGraphQl() {
    this.app.use('/graphql', authenticate, bodyParser.json(), graphqlExpress({ schema }));
    return this;
  }

  /**
   * Register Error Handler
   */
  regiterErrorHandler() {
    this.app.use((err, req, res, next) => {
      const handler = new ErrorHandler;
      handler.handle(err, req, res);
      console.log(err);
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