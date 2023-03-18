export const getProducts = () => async (dispatch) => {
  try {
    const data = await fetch(
      "https://amazonclonebackend.onrender.com/getproducts",
      {
        //restart after adding proxy
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await data.json();
    console.log(res);
    dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: res });
  } catch (error) {
    dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.response });
  }
};
