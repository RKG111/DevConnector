import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
//Load User
export const loadUser = ()=> async dispatch=>{
    // console.log(localStorage.token);
    // console.log("loadUser");
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    
    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        // console.log(res);
    }
    catch(err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Register User

export const register = ({name, email,password})=>async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body= JSON.stringify({name, email, password});

    try{
        const res = await axios.post('/api/users', body, config);
        console.log("done")
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
       dispatch(loadUser());
        // localStorage.setItem(JSON.stringify(res.data))
        // console.log(res.data)
    }
    catch(err){
        const errors = err.response.data.errors;
        console.log(err)
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                
            
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }

}
//Login User
export const login = (email,password)=>async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body= JSON.stringify({ email, password});

    try{
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser())
       
        // localStorage.setItem(JSON.stringify(res.data))
        // console.log(res.data)
    }
    catch(err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                
            
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }

}


//Logout / Clear Profile

export const logout = () => dispatch => {
    
    dispatch({type: CLEAR_PROFILE});
    dispatch({type: LOGOUT});
}