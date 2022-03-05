import {gql} from '@apollo/client';

export const ADD_USER = 
//first line = declare function and parameters
//second line is calling function and mapping parameters to typeDefs
//third line is what will be returned to the front-end (token AND user)
gql`
mutation addUser($username: String!, $email: String!, $password: String!)  {
    addUser(username: $username, email: $email, password: $password){
        token
        user{_id username email}
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const SAVE_BOOK = gql `
mutation saveBook($title:String!, $description: String!, $bookId: String!, $authors:[String], $image:String, $link:String ) {
  saveBook(title:$title, description: $description, bookId: $bookId, authors:$authors, image:$image, link:$link) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;

