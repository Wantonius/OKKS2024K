import {themes,ThemeContext} from './context/ThemeContext';
import {useState} from 'react';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ToggleButton from './components/ToggleButton';

function App() {

	const [state,setState] = useState({
		theme:themes.dark
	})
	
	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}

	return (
		<ThemeContext.Provider value={state.theme}>
			<Headline>
			Passing Data Deeply with Context
			</Headline>
			<Paragraph>
			Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
			</Paragraph>
			<ToggleButton toggleTheme={toggleTheme}/>
		</ThemeContext.Provider>
	)
}

export default App
