import useAction from './hooks/useAction'	
import useAppState from './hooks/useAppState';
import {useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';


function App() {

	const {getList} = useAction();
	const {loading,isLogged,error} = useAppState();

	useEffect(() => {
		if(isLogged) {
			getList();
		}
	},[isLogged])

	let message = <></>
	if(loading) {
		message = <h4>Loading ...</h4>
	}
	if(error) {
		message = <h4>{error}</h4>
	}
	if(isLogged) {
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
