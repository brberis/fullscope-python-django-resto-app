import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;



export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation AddOrder($products: [ID]!) {
    addOrder(products: $products) {
      _id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $sessionId: String, $status: String) {
    updateOrder(_id: $id, sessionId: $sessionId, status: $status) {
      _id
    }
  }
`;

export const ADD_CREATION = gql`
  mutation AddCreation($creationUrl: String!) {
    addCreation(creationUrl: $creationUrl) {
      _id
    }
  }
`;

export const REMOVE_CREATION = gql`
  mutation RemoveCreation($id: ID!) {
    removeCreation(_id: $id) {
      _id
    }
  }
`;

export const REST_CREDITS = gql`
  mutation RestCredits($credits: Int!) {
    restCredits(credits: $credits) {
      _id
      username
      email
      credits
    }
  }
`;

export const ADD_CREDITS = gql`
  mutation AddCredits($sessionId: String!) {
    addCredits(sessionId: $sessionId) {
      _id
    }
  }
`;
