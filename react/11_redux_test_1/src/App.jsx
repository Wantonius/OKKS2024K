import {useSelector,useDispatch} from 'react-redux';

function App() {

	const dispatch = useDispatch();
	const count = useSelector(state => {
		console.log("useSelector,state",state);
		return state.count
	});

	const increment = () => {
		console.log("Dispatching INCREMENT")
		dispatch({
			type:"INCREMENT"
		})
	}
	
	const decrement = () => {
		console.log("Dispatching DECREMENT");
		dispatch({
			type:"DECREMENT"
		})
	}

	return (
		<>
			<h2>Current count:{count}</h2>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
		</>
	)
}

export default App
