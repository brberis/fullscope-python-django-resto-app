import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cartOpen: false,
    cart: [],
    businessCategories: [],
    currentBusinessCategory: 'Select category...',
    businessTypes: [],
    currentBusinessType: 'Select type...',
    conceptInfo: [{readyToOrder: false, businessType: null, businessCategory: null}],
    apiResults: []
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
