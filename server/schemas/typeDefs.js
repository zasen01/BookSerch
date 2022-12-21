// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
}
type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Auth {
    token: ID!
    user: User
  }

type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;