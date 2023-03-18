const products = [];

export const getProductsreducer = (state = { products }, action) => {
  //why not state = products without {}
  switch (action.type) {
    case "SUCCESS_GET_PRODUCTS":
      return { products: action.payload };
    //   return {state: action.payload };
    case "FAIL_GET_PRODUCTS":
      return { products: action.payload };
    //   return { state: action.payload }; why not use () instead of {}
    default:
      return state;
  }
};
