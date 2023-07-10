import express from "express";
import bodyParser from "body-parser";import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';

// Construct a schema, using GraphQL schema language
const typeDefs = `#graphql
  type Query {
    hello: String
    gamik: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
      hello: () => 'Hello world!',
      gamik: () => 'Hello Gamik',
    },
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
  
);


await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);