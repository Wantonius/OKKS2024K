import {useState,useEffect,useContext} from 'react';
import useAppState from './useAppState';
import * as actionConstants from '../context/actionConstants';
import ActionContext from '../context/ActionContext';

const useAction = () => {
	
	const {dispatch} = useContext(ActionContext);
	const {token} = useAppState();
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	

	//USEEFFECT FETCH

	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(urlRequest.url,urlRequest.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"Server never responded. Logging you out."
				})
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information. Try again later."
							})
							return;
						}
						dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:data
						})
						return;
					case "add":
						dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return;
					case "remove":
						dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;
					case "edit":
						dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						return;
					case "register":
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return
					case "login":
						const loginData = await response.json();
						if(!loginData) {
							dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Failed to parse login information. Try again later"
							})
							return;
						}
						dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:loginData.token
						})
						return;
					case "logout":
						dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					dispatch({
						type:actionConstants.LOGOUT_FAILED,
						error:"Your session has expired. Logging you out."
					})
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText;
				switch(urlRequest.action) {
					case "register":
						if(response.status === 409) {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Username already in use"
							})
							return;
						} else {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Register failed."+errorMessage
							})
							return;
						}
					case "login":
						dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Login failed."+errorMessage
							})
						return;
					case "getlist":
						dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to fetch shopping information."+errorMessage
							})
						return;
					case "add":
						dispatch({
								type:actionConstants.ADD_ITEM_FAILED,
								error:"Failed to add new item."+errorMessage
							})
						return;
					case "remove":
						dispatch({
								type:actionConstants.REMOVE_ITEM_FAILED,
								error:"Failed to remove item."+errorMessage
							})
						return;
					case "edit":
						dispatch({
								type:actionConstants.EDIT_ITEM_FAILED,
								error:"Failed to edit item."+errorMessage
							})
						return;
					case "logout":
						dispatch({
								type:actionConstants.LOGOUT_FAILED,
								error:"Server responded with an error. Logging you out."
							})
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	}, [urlRequest]);

	//REST API

	const getList = (t,search) => {
		let tempToken = token;
		if(t) {
			tempToken = t;
		}
		let url = "/api/shopping"
		if(search) {
			url = url + "?type="+search
		}
		setUrlRequest({
			url:url,
			request:{
				"method":"GET",
				"headers":{
					"token":tempToken
				}
			},
			action:"getlist"
		})
	}

	const add = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"POST",
				"headers":{
					"Content-type":"application/json",
					"token":token
				},
				"body":JSON.stringify(item)
			},
			action:"add"
		})
	}
	
	const remove = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				"method":"DELETE",
				"headers":{
					"token":token
				}
			},
			action:"remove"
		})
	}

	const edit = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item._id,
			request:{
				"method":"PUT",
				"headers":{
					"Content-type":"application/json",
					"token":token
				},
				"body":JSON.stringify(item)
			},
			action:"edit"
		})
	}
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				"method":"POST",
				"headers":{
					"Content-type":"application/json"
				},
				"body":JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		dispatch({
			type:actionConstants.SET_USERNAME,
			user:user.username
		})
		setUrlRequest({
			url:"/login",
			request:{
				"method":"POST",
				"headers":{
					"Content-type":"application/json"
				},
				"body":JSON.stringify(user)
			},
			action:"login"
		})
	}

	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				"method":"POST",
				"headers":{
					"token":token
				}
			},
			action:"logout"
		})
	}
	
	const setError = (error) => {
		dispatch({
			type:actionConstants.REGISTER_FAILED,
			error:error
		})
	}

	return {add,remove,edit,register,login,logout,setError,getList}
}

export default useAction;