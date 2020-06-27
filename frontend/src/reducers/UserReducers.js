const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNIN_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCESS, USER_SIGNUP_FAIL } = require("../constants/userConstants");

function siginUserReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCESS:
            return { loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

function signupUserReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true};
        case USER_SIGNUP_SUCESS:
            return { loading: false, userInfo: action.payload};
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
}

export {
    siginUserReducer,
    signupUserReducer
}
