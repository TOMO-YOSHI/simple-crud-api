import * as dotenv from 'dotenv';
dotenv.config();
import fs from "fs";
import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import { resolvers } from "./resolvers";
import { expressjwt } from 'express-jwt';
import router from './routes'
import { jwtSecret } from './config';


const startServer = async () => {

  const app = express();
  app.use(cors(), bodyParser.json(), expressjwt({
    algorithms: ['HS256'],
    secret: jwtSecret,
    credentialsRequired: false
  }));

  const httpServer = createServer(app);

  const typeDefs = gql(fs.readFileSync(`${__dirname}/schema.graphql`, { encoding: 'utf8' }));
  const context = async({req}: any) => {
    return {auth: req.auth}
  }
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  await apolloServer.start()

  // Route for GraphQL
  apolloServer.applyMiddleware({
    app,
    path: '/graphql'
  });

  // Route for RestAPI
  app.use('/api', router);

  httpServer.listen({ port: process.env.PORT || 4000}, () =>
    console.log(`Server listening on localhost:${process.env.PORT || 4000}${apolloServer.graphqlPath}`)
  );
}

startServer();
