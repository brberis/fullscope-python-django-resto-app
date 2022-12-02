import gql from 'graphql-tag';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    creations {
      _id
      creationUrl
    }
    orders {
      _id
    }
    credits
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    username
    orders {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        image
      }
    }
    
  }
}
`;

export const QUERY_CREATION = gql`
  query Api($promptInput: String!) {
    api(promptInput: $promptInput) {
      data
    }
  }
`;

export const QUERY_CREATIONS = gql`
  query Creations {
    creations {
      _id
      creationUrl
    }
  }
`;


export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
  }
}
`;

export const QUERY_PRODUCTS = gql`
 {
    products {
      _id
      name
      description
      price
      quantity
      image
      
        
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query Product($id: ID!) {
    product(_id: $id) {
      name
      price
    }
  }
`;


export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_BUSINESS_CATEGORIES = gql`
{
  businessCategories {
    _id
    name
  }
}
`;

export const QUERY_BUSINESS_TYPES = gql`
  query businessTypes($businessCategory: ID!) {
    businessTypes(businessCategory: $businessCategory) {
      _id
      title
    }
  }
`;


export const QUERY_COLLECTIONS = gql`
  query businessTypes($businessCategory: ID!) {
    businessTypes(businessCategory: $businessCategory) {
      _id
      title
    }
  }
`;
