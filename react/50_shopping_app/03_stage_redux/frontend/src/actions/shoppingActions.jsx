import {loading,stopLoading,logoutFailed} from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC THUNKS

export const getList = (token,search) => {
	return (dispatch) => {
		let url = "/api/shopping";		
		if(search) {
			url = url +"?type="+search;
		}
		let request = {
			"method":"GET",
			"headers":{
				"token":token
			}
		}
		handleFetch(request,url,"getlist",dispatch,token);
	}
}

export const add = (token,item) => {
	return (dispatch) => {
		let request = {
			"method":"POST",
			"headers":{
				"Content-type":"application/json",
				"token":token
			},
			"body":JSON.stringify(item)
		}
		handleFetch(request,"/api/shopping","add",dispatch,token);
	}
}

export const remove = (token,id) => {
	return (dispatch) => {
		let request = {
			"method":"DELETE",
			"headers":{
				"token":token
			}
		}
		let url = "/api/shopping/"+id;
		handleFetch(request,url,"remove",dispatch,token);
	}
}

export const edit = (token,item) => {
	return (dispatch) => {
		let request = {
			"method":"PUT",
			"headers":{
				"Content-type":"application/json",
				"token":token
			},
			"body":JSON.stringify(item)
		}
		let url = "/api/shopping/"+item._id
		handleFetch(request,url,"edit",dispatch,token);
	}	
}

const handleFetch = async (request,url,act,dispatch,token) => {
	dispatch(loading());
	const response = await fetch(url,request);
	dispatch(stopLoading());
	if(!response) {
		dispatch(logoutFailed("Server never responded. Logging you out"))
		return;
	}
	if(response.ok) {
		switch(act) {
			case "getlist":
				const list = await response.json();
				if(!list) {
					dispatch(fetchListFailed("Failed to parse shopping information. Try again later."));
					return;
				}
				dispatch(fetchListSuccess(list));
				return
			case "add":
				dispatch(fetchItemSuccess(actionConstants.ADD_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			case "remove":
				dispatch(fetchItemSuccess(actionConstants.REMOVE_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			case "edit":
				dispatch(fetchItemSuccess(actionConstants.EDIT_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			default:
				return;
		}
	} else {
		if(response.status === 403) {
			dispatch(logoutFailed("Your session has expired. Logging you out!"));
			return;
		}
		const errorMessage = " Server responded with a status "+response.status+" "+response.statusText
		switch(act) {
			case "getlist":
				dispatch(fetchListFailed("Failed to fetch shopping information."+errorMessage));
				return;
			case "add":
				dispatch(fetchItemFailed(actionConstants.ADD_ITEM_FAILED,"Failed to add new item."+errorMessage))
				return;
			case "remove":
				dispatch(fetchItemFailed(actionConstants.REMOVE_ITEM_FAILED,"Failed to remove item."+errorMessage))
				return;
			case "edit":
				dispatch(fetchItemFailed(actionConstants.EDIT_ITEM_FAILED,"Failed to edit item."+errorMessage))
				return;
			default:
				return;
		}
	}
}

//ACTION CREATORS

const fetchListSuccess = (list) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchListFailed = (error) => {
	return {
		type:actionConstants.FETCH_LIST_FAILED,
		error:error
	}
}

const fetchItemSuccess = (type) => {
	return {
		type:type
	}
}

const fetchItemFailed = (type,error) => {
	return {
		type:type,
		error:error
	}
}
