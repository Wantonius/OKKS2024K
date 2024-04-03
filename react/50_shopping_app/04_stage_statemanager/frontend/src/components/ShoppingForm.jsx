import {useState} from 'react';
import useAction from '../hooks/useAction';

const ShoppingForm = () => {
	
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
	})
	
	const {add} = useAction();
	
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
		let item = {
			...state
		}
		add(item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	return(
		<div style={{
			"backgroundColor":"pink",
			"margin":"auto",
			"width":"40%",
			"textAlign":"center"
		}}>
			<form className="m-3" onSubmit={onSubmit}>
				<div className="form-group">
					<label className="form-label" htmlFor="type">Type</label>
					<input type="text"
							name="type"
							id="type"
							className="form-control"
							onChange={onChange}
							value={state.type}/>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="count">Count</label>
					<input type="number"
							name="count"
							id="count"
							className="form-control"
							onChange={onChange}
							value={state.count}/>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="price">Price</label>
					<input type="number"
							name="price"
							id="price"
							step="0.01"
							className="form-control"
							onChange={onChange}
							value={state.price}/>
				</div>
				<input type="submit" value="Add" className="btn btn-secondary"/>
			</form>
		</div>	
	)
	
}

export default ShoppingForm;