import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
