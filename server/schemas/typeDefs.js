// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String!
  email: String!
  savedBooks: [Book]
}
type Book{
  bookId: ID!
  author: [String]
  description: String
  image: String
  link: String
  title: String!

}

type Auth {
  token: ID!
  user: User
}

type BookInput{
  bookId: String!
  author: [String]
  description: String!
  image: String
  link: String
  title: String!

}

type Query {
    me: User
}



type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;