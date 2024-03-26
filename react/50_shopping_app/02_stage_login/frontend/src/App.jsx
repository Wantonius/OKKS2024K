import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';


function App() {

	const {state,addItem,removeItem,editItem,register,login,logout} = useAction();

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
				<Navbar logout={logout} isLogged={state.isLogged} user={state.user}/>
				<div style={{height:25,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
					<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	} else {
		return (
			<>
				<Navbar logout={logout} isLogged={state.isLogged} user={state.user}/>
				<div style={{height:25,textAlign:"center"}}>
					{message}
				</div>
				<Routes>
					<Route path="/" element={<LoginPage login={login} register={register} setError={setError}/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}
}

export default App
