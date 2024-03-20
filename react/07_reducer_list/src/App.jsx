import {useReducer} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const contactReducer = (state,action) => {
	switch(action.type) {
		case "ADD_CONTACT":
			action.contact.id = state.id
			return {
				list:state.list.concat(action.contact),
				id:state.id+1
			}
		case "REMOVE_CONTACT":
			let tempList = state.list.filter(contact => action.id !== contact.id)
			return {
				...state,
				list:tempList
			}
		case "EDIT_CONTACT":
			let tempList2 = state.list.slice()
			for(let i=0;i<tempList2.length;i++) {
				if(action.contact.id === tempList2[i].id) {
					tempList2.splice(i,1,action.contact)
				}
			}
			return {
				...state,
				list:tempList2
			}
		default:
			return state;
	}
}

const initialState = {
	list:[],
	id:100
}

function App() {
		
	const [state,dispatch] = useReducer(contactReducer,initialState);
	
	const addContact = (contact) => {
		dispatch({
			type:"ADD_CONTACT",
			contact:contact
		})
	}
	
	const removeContact = (id) => {
		dispatch({
			type:"REMOVE_CONTACT",
			id:id
		})
	}
	
	const editContact = (contact) => {
		dispatch({
			type:"EDIT_CONTACT",
			contact:contact
		})
	}

	return (
		<>
			<ContactForm addContact={addContact}/>
			<hr/>
			<ContactList list={state.list} removeContact={removeContact} editContact={editContact}/>
		</>
	)
}

export default App
