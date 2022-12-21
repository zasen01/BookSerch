const express = require('express');
//importing ApoilloServer
const { ApolloServer } = require('apollo-server-express');

//importing typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// creates a new Apollo server and passes in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        // log where we can go to test our GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
  };
  
  startApolloServer(typeDefs, resolvers);