import { useReducer } from "react";
import {
  ADD_TO_CART,
  UPDATE_CREDIT_QUANTITY,
  REMOVE_FROM_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  UPDATE_BUSINESS_CATEGORIES,
  UPDATE_CURRENT_BUSINESS_CATEGORY,
  UPDATE_BUSINESS_TYPES,
  UPDATE_CURRENT_BUSINESS_TYPE,
  UPDATE_CONCEPT_INFO,
  API_RESULTS
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case UPDATE_CREDIT_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity
          }
          return product
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_BUSINESS_CATEGORIES:
      return {
        ...state,
        businessCategories: [...action.businessCategories],
      };

    case UPDATE_BUSINESS_TYPES:
      return {
        ...state,
        businessTypes: [...action.businessTypes],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };

    case UPDATE_CURRENT_BUSINESS_CATEGORY:
      return {
        ...state,
        currentBusinessCategory: action.currentBusinessCategory
      };

    case UPDATE_CURRENT_BUSINESS_TYPE:
      return {
        ...state,
        currentBusinessType: action.currentBusinessType
      };

    case UPDATE_CONCEPT_INFO:
      return {
        ...state,
        conceptInfo: action.conceptInfo
      };

    case API_RESULTS:
      return {
        ...state,
        apiResults: action.apiResults
      }

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}