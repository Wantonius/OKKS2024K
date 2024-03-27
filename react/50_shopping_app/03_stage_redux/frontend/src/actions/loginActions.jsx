import * as actionConstants from './actionConstants';


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

const handleLogin = async (request,url,act,dispatch) => {
	dispatch(loading());
	const response = await fetch(url,request);
	dispatch(stopLoading());
	if(!response) {
		//dispatch logoutFailed
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register":
				dispatch(registerSuccess());
				return;
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