const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

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
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email: email});
            const userCorrectPassword = await user.isCorrectPassword(password);
            //if user has correct password, assign a token and return the token and user info to the frontend
            if (!userCorrectPassword) {
                throw console.error('Incorrect creds');
            } 
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                //if session is true, find a user by their session user id
                const updateUser = await User.findOneAndUpdate({_id: context.user._id}, 
                    //push args into savedBooks array since its already an object
                    {$push: {savedBooks: args}}, 
                    {new: true, runValidator: true});
                    return updateUser;
            }
            throw new AuthenticationError("You're not logged in");
        },
        removeBook: async(parent, args, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate({_id: context.user._id},
                    {$pull: {savedBooks: args}},
                    {new: true});
                    return updateUser;
            }
            throw new AuthenticationError("Youre not logged in");
        }
    }
}
module.exports = resolvers;