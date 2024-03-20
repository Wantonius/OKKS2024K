import {useState} from 'react';

const ContactList = (props) => {

	const [state,setState] = useState({
		removeIndex:-1,
		editIndex:-1
	})

	const changeMode = (mode,index) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeContact = (id) => {
		props.removeContact(id);
		changeMode("cancel",0)
	}

	const editContact = (contact) => {
		props.editContact(contact);
		changeMode("cancel",0)
	}


	const contacts = props.list.map((contact) => {
		return (
			<tr key={contact.id}>
				<td>{contact.firstname}</td>
				<td>{contact.lastname}</td>
				<td>{contact.email}</td>
				<td>{contact.phone}</td>
				<td><button onClick={() => props.removeContact(contact.id)}>Remove</button></td>
			</tr>
		)
	})
	
	return(
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
				</tr>	
			</thead>
			<tbody>
			{contacts}
			</tbody>
		</table>
	)
}

export default ContactList;