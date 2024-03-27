import * as actionConstants from './actionConstants';
import {getList} from './shoppingActions';

//ASYNC THUNKS

export const register = (user) => {
	return (dispatch) => {
		let request = {
			"method":"POST",
			"headers":{
				"Content-Type":"application/json"
			},
			"body":JSON.stringify(user)
		}
		handleLogin(request,"/register","register",dispatch)
	}
}

export const login = (user) => {
	return (dispatch) => {
		let request = {
			"method":"POST",
			"headers":{
				"Content-Type":"application/json"
			},
			"body":JSON.stringify(user)
		}
		dispatch(setUser(user.username));
		handleLogin(request,"/login","login",dispatch)
	}
}

export const logout = (token) => {
	return (dispatch) => {
		let request = {
			"method":"POST",
			"headers":{
				"token":token
			}
		}
		handleLogin(request,"/logout","logout",dispatch)
	}
}

const handleLogin = async (request,url,act,dispatch) => {
	dispatch(loading());
	const response = await fetch(url,request);
	dispatch(stopLoading());
	if(!response) {
		dispatch(logoutFailed("Server never responded. Resetting"))
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register":
				dispatch(registerSuccess());
				return;
			case "login":
				const data = await response.json();
				if(!data) {
					dispatch(loginFailed("Failed to parse login information. Try again later"));
					return;
				}
				dispatch(loginSuccess(data.token));
				dispatch(getList(data.token));
				return;
			case "logout":
				dispatch(logoutSuccess());
			default:
				return;
		}
	} else {
		let errorMessage = " Server responded with a status "+response.status+" "+response.statusText
		switch(act) {
			case "register":
				if(response.status === 409) {
					dispatch(registerFailed("Username already in use"));
					return;
				}
				dispatch(registerFailed("Register failed."+errorMessage));
				return;
			case "login":
				dispatch(loginFailed("Login failed."+errorMessage));
				return;
			case "logout":
				dispatch(logoutFailed("Server responded with an error. Logging you out."));
				return;
			default:
				return;
		}
	}
}

//ACTION CREATORS

export const loading = () => {
	return {
		type:actionConstants.LOADING
	}
}

export const stopLoading = () => {
	return {
		type:actionConstants.STOP_LOADING
	}
}

const registerSuccess = () => {
	return {
		type:actionConstants.REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:actionConstants.REGISTER_FAILED,
		error:error
	}
}

const loginSuccess = (token) => {
	return {
		type:actionConstants.LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error) => {
	return {
		type:actionConstants.LOGIN_FAILED,
		error:error
	}
}

const logoutSuccess = () => {
	return {
		type:actionConstants.LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:actionConstants.LOGOUT_FAILED,
		error:error
	}
}

const setUser = (user) => {
	return {
		type:actionConstants.SET_USERNAME,
		user:user
	}
}