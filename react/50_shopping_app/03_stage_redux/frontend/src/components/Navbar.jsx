import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logout} from '../actions/loginActions';

const Navbar = (props) => {
	
	const selector = (state) => {
		return {
			isLogged:state.login.isLogged,
			token:state.login.token,
			user:state.login.user
		}
	}
	const state = useSelector(selector);
	const dispatch = useDispatch();
	
	if(state.isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form" className="nav-link">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p className="nav-link" style={{color:"blue"}}>Logged in as {state.user}</p>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link" onClick={() => dispatch(logout(state.token))}>Logout</Link>
					</li>						
				</ul>
			</nav>
		)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			</nav>
		)
		
	}
}

export default Navbar;