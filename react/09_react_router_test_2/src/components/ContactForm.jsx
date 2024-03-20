import {useState} from 'react';


const ContactForm = (props) => {
	
	const [state,setState] = useState({
		firstname:"",
		lastname:"",
		email:"",
		phone:""
	})
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			...state,
			id:0
		}
		props.addContact(contact)
		setState({
			firstname:"",
			lastname:"",
			email:"",
			phone:""
		})
	}
	
	return(
		<div style={{"width":"40%","backgroundColor":"lightgreen","margin":"auto","textAlign":"center"}}>
		<form onSubmit={onSubmit} className="m-3">
			<label htmlFor="firstname" className="form-label">First Name</label>
			<input type="text"
					name="firstname"
					className="form-control"
					id="firstname"
					onChange={onChange}
					value={state.firstname}/>
			<br/>
			<label htmlFor="lastname" className="form-label">Last Name</label>
			<input type="text"
					name="lastname"
					className="form-control"
					id="lastname"
					onChange={onChange}
					value={state.lastname}/>
			<br/>
			<label htmlFor="email" className="form-label">Email</label>
			<input type="email"
					name="email"
					id="email"
					className="form-control"
					onChange={onChange}
					value={state.email}/>
			<br/>
			<label htmlFor="phone" className="form-label">Phone</label>
			<input type="tel"
					name="phone"
					id="phone"
					className="form-control"
					onChange={onChange}
					value={state.phone}/>
			<br/>
			<input type="submit" value="Add Contact" className="btn btn-primary"/>
		</form>
		</div>
	)
}

export default ContactForm;