// not a needed file
// but in case of multiple reducer function we have to create a combined reducer
import { getProductsreducer } from "./Productsreducer";
import { combineReducers } from "redux";

const rootreducers = combineReducers({
  getproductsdata: getProductsreducer,
});

export default rootreducers;
