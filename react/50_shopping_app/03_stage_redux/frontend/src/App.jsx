import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';


function App() {

	const selector = (state) => {
		let error = state.shopping.error;
		if(state.login.error) {
			error = state.login.error
		}
		return {
			isLogged:state.login.isLogged,
			loading:state.login.loading,
			error:error
		}
	}
	
	const state = useSelector(selector);
	
	let message = <></>
	if(state.loading) {
		message = <h4>Loading ...</h4>
	}
	if(state.error) {
		message = <h4>{state.error}</h4>
	}
	if(state.isLogged) {
		return (
			<>
				<Navbar />
				<div style={{height:25,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<ShoppingList />}/>
					<Route path="/form" element={<ShoppingForm />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	} else {
		return (
			<>
				<Navbar />
				<div style={{height:25,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}
}

export default App
