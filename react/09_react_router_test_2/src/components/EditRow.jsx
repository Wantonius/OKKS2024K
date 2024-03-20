import {useState} from 'react';

const EditRow = (props) => {
	
	const [state,setState] = useState({
		firstname:props.contact.firstname,
		lastname:props.contact.lastname,
		email:props.contact.email,
		phone:props.contact.phone
	})
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const editContact = () => {
		let contact = {
			...state,
			id:props.contact.id
		}
		props.editContact(contact)
	}
	
	return(
		<tr>
			<td><input type="text"
						name="firstname"
						id="firstname"
						className="form-control"
						onChange={onChange}
						value={state.firstname}/></td>	
			<td><input type="text"
						name="lastname"
						id="lastname"
						className="form-control"
						onChange={onChange}
						value={state.lastname}/></td>	
			<td><input type="email"
						name="email"
						id="email"
						className="form-control"
						onChange={onChange}
						value={state.email}/></td>	
			<td><input type="tel"
						name="phone"
						id="phone"
						className="form-control"
						onChange={onChange}
						value={state.phone}/></td>
			<td><button className="btn btn-success" onClick={editContact}>Save</button></td>
			<td><button className="btn btn-secondary" onClick={() => props.changeMode("cancel",0)}>Cancel</button></td>
		</tr>
	)
}

export default EditRow;