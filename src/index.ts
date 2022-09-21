import * as dotenv from 'dotenv';
dotenv.config();
import fs from "fs";
import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import { resolvers } from "./resolvers";
// import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { expressjwt } from 'express-jwt';
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const privateKey = fs.readFileSync(`${__dirname}/private.key`);
const jwtSecret = process.env.JWT_SECRET || "17NfUBizz9tBwt1cCWzNqthWQanwpETJ";
// const jwtSecret = "17NfUBizz9tBwt1cCWzNqthWQanwpETJ";

console.log(process.env)

// const PORT = 4000;

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
    // if (req.auth) {
    //   const user = await prisma.user.findUnique({
    //     where: {
    //       id: req.auth.sub
    //     }
    //   });
    //   return { user }
    // }
    // return {};
    return {auth: req.auth}
  }
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/graphql'
  });

  app.post('/login', async (req, res) => {
    try {
      const { name, password } = req.body;

      // const saltRounds = process.env.SOLTROUNDS;
      // const hash = bcrypt.hashSync(password, saltRounds);

      const user = await prisma.user.findUnique({
        where: {
          name: name
        }
      });

      // If there is not a user
      if (!user) {
        throw new Error('Your name or password is wrong.')
      };

      const passwordCheck = bcrypt.compareSync(password, user.password);

      // If password is wrong
      if(!passwordCheck) {
        throw new Error('Your name or password is wrong.')
      }

      const token = jwt.sign(
        { sub: user.id },
        jwtSecret        
      );

      // var decoded = jwt.verify(token, privateKey);
      // console.log(decoded.sub)

      res.status(200).json({ token });
    } catch(error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      res.status(401).json({ message: message });
    }
  });

  httpServer.listen({ port: process.env.PORT || 4000}, () =>
    console.log(`Server listening on localhost:${process.env.PORT || 4000}${apolloServer.graphqlPath}`)
  );
}

startServer();
