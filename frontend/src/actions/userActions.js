import Axios from "axios";
import Cookies from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCESS,
  USER_SIGNUP_FAIL,
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });

    dispatch({ type: USER_SIGNIN_SUCESS, payload: data });

    Cookies.set("userInfo", JSON.stringify(data));
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: USER_SIGNIN_FAIL, payload: message });
  }
};

const signup = (name, email, password, repassword) => async (dispatch) => {
  try {
    if (password.localeCompare(repassword) === 0) {
      dispatch({
        type: USER_SIGNUP_REQUEST,
        payload: { name, email, password },
      });
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });

      dispatch({ type: USER_SIGNUP_SUCESS, payload: data });

      dispatch(signin(email, password));
    } else {        
      dispatch({ type: USER_SIGNUP_FAIL, payload: "passwords don't match" });
    }
  } catch (error) {
    const message = error.response.data.message;
    dispatch({ type: USER_SIGNUP_FAIL, payload: message });
  }
};

export { signin, signup };
