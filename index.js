const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Authors {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int
  },

  type Books {
    title: String!
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String]
  },

  type Mutation {
    addBook(
        title: String!,
        published: Int!,
        author: String!,
        genres: [String!],
    ): [Books],

    editAuthor(name: String!, setBornTo: Int!): [Authors]
  }
  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allAuthors: [Authors!]!,
    allBooks(author: String, genre: String): [Books]
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => authors,
    allBooks: (root, args) => {
        if(args.author && args.genre){
            return books.filter(n => args.author === n.author && n.genres.includes(args.genre) )
        }
        else if(args.author){
            return books.filter(n => args.author === n.author)
        }
        else if (args.genre){
            return books.filter(n => n.genres.includes(args.genre))
        }
        else{
            return books 
        }
    }
  },
  Mutation: {
    addBook: (root, args) => {
        const findAuthor = authors.find(n => n.name === args.author)
        if(findAuthor){
            const book = {
                title: args.title,
                published: args.published,
                author: args.author,
                genres: args.genre,
                id: uuid()
            }
            books.push(book)
            return books
        }else{
            const book = {
                title: args.title,
                published: args.published,
                author: args.author,
                genres: args.genre,
                id: uuid()
            }
            authors.concat({name: args.author, id: uuid()})
            books.concat(book)
            return books
        }
    },
    editAuthor: (root, args) => {
        const findAuthor = authors.find( n => n.name === args.name)
        const final = authors.map((n) => n.name === args.name ? {name: args.name, born: args.setBornTo} : n)
        console.log(final)
        if(findAuthor){
            console.log(final)
            return final
        }else{
            return null 
        }
    }
  },
  Authors: {
    bookCount: (root) => books.filter((n)=> root.name === n.author).length
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})