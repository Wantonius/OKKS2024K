import useAction from './hooks/useAction';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

function App() {

	const {state,addItem,removeItem,editItem} = useAction();

	return (
		<>
			<ShoppingForm addItem={addItem}/>
			<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>
		</>
	)
}

export default App
