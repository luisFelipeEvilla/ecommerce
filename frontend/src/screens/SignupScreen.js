import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../actions/userActions';
import SpinningBar from '../partials/spinningBar';

function SignupScreen (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userSignup = useSelector(state => state.userSignup);
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignup;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo || userSignin.userInfo) {
            props.history.push('/')
        }
        return () => {
            //
        };
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password, rePassword));
    }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                        Sign-Up
                  </h2>
                </li>
                <li>
                    {loading && <SpinningBar></SpinningBar>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                  </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                  </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="repassword">
                        Repeat Password
                    </label>
                    <input type="password" name="repassword" id="repassword" onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Sign Up</button>
                </li>
                <li>
                    Already have a account?
              </li>
                <li>
                    <Link to="/singin" className="button secondary text-center">Signin in your account</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default SignupScreen;