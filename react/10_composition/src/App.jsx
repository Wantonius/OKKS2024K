import { useState } from 'react'
import ContactCard from './components/ContactCard';
import ContactInfo from './components/ContactInfo';
import NamedChildren from './components/NamedChildren';

function App() {
	
	const [click,setClick] = useState(0)

	return (
		<>
			<ContactCard>
				<ContactInfo name="Erno" profession="Koodari"/>
			</ContactCard>
			<ContactCard>
				<h3>Current clicks:{click}</h3>
				<button onClick={() => setClick(click => click+1)}>Click</button>
			</ContactCard>
			<NamedChildren
				header={<h2>Complex Card</h2>}
				media={<h2>Media area</h2>}
				content={<h2>Content area</h2>}
			/>
			<NamedChildren
				header={<h2>No Media card</h2>}
				content={<h2>Content area</h2>}
			/>				
		</>
	)
}

export default App
