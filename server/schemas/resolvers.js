const {User} = require('../models');
const signToken = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return User.findOne({_id: context.user._id});
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        }
    }
}

module.exports = resolvers;