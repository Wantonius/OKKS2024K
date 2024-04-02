import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

const ToggleButton = (props) => {
	
	const theme = useContext(ThemeContext);
	
	return (
		<button style={{...theme}} onClick={props.toggleTheme}>
			Toggle Theme
		</button>
	)
}

export default ToggleButton;