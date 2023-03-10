const express = require('express');
//importing ApoilloServer
const { ApolloServer } = require('apollo-server-express');
const path = require("path");
const { authMiddleware } = require('./utils/auth');

//importing typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

// creates a new Apollo server and passes in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../client/build")))
}
app.get("/",(req,res)=>{res.sendFile(path.join(__dirname,"../client/"))})

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