const initialState = {
  appCurrency: "$",
  cart: [],
};

export const appCurrency = (state = initialState.appCurrency, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return action.payload;
    default:
      return state;
  }
};

export const cart = (state = initialState.cart, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      return [...state, action.payload];
    case 'ADD_NEXT_PRODUCT':
      let stateAdd = JSON.stringify(state);
      let newStateAdd = JSON.parse(stateAdd);
    return newStateAdd.map((el) => {
        if (el.idInCart === action.payload) {
          el.numberOfProducts += 1
        }
        return el
      });
    case 'REMOVE_ONE_PRODUCT':
      let stateRemove = JSON.stringify(state);
      let newStateRemove = JSON.parse(stateRemove);
      return newStateRemove.map((el) => {
        if (el.idInCart === action.payload) {
          if (el.numberOfProducts > 0) {
            el.numberOfProducts -= 1
          }
        }
        return el
      });
    case 'ADD_SAME_PRODUCT':
      const statePrevious = JSON.stringify(state);
      const newState = JSON.parse(statePrevious);
      const ProductToFind = newState.find(product => product.idInCart === action.payload);
      ProductToFind.numberOfProducts += 1;
      return newState;
    case 'REMOVE_FROM_CART':
      return state.filter(({ idInCart }) => idInCart !== action.payload)
    case 'CLEAN_THE_CART':
      return [];
    default:
      return state;
  }
};
