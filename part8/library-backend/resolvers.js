const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        filter.author = args.author
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return await Book.find(filter).populate('author')
    },
    me: (root, args, context) => {
    return context.currentUser
  }
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },

    createUser: {
      resolve: async (root, args) => {
        const user = new User({ username: args.username })
        return user.save().catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
      }
    },

    login: {
      resolve: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if (!user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers
