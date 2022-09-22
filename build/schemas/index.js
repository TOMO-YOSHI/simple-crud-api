"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
    type Query {
      hello: String
      boards: [Board]
    }

    type Board {
      id: ID!
      title: String!
      description: String
      path: String!
    }
  `;
