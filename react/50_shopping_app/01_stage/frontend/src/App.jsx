import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';

function App() {

	const {state,addItem,removeItem,editItem} = useAction();

	return (
		<>
			<ShoppingForm addItem={addItem}/>
		</>
	)
}

export default App
