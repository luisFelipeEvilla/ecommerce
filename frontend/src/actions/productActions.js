import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";
import axios from "axios";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    const { data } = await axios.get("/api/products/" + productId);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();

    // upload 
    const form = new FormData();
      form.append('name', product.name);
      form.append('price', product.price);
      form.append('image', product.image);
      form.append('brand', product.brand);
      form.append('category', product.category);
      form.append('countInStock', product.countInStock);
      form.append('description', product.description);

    if (product._id) {
      form.append('_id', product._id);

      const { data } = await axios.put(
        "/api/products/" + product._id,
        form,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
            'content-type': 'multipart/form-data'
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCESS, payload: data });
    } else {
      const { data } = await axios.post("/api/products", form, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
          'content-type': 'multipart/form-data'
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCESS, payload: data });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: message });
  }
};

const deleteProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product });

    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.delete("/api/products/" + product._id, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });

    dispatch({ type: PRODUCT_DELETE_SUCESS, payload: data });
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export { listProducts, detailsProduct, saveProduct, deleteProduct};
