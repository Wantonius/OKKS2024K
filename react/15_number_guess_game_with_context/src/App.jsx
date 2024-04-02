import StartPage from './components/StartPage';
import GamePage from './components/GamePage';
import {Routes,Route,Navigate} from 'react-router-dom';
function App() {

  return (
	<Routes>
		<Route path="/" element={<StartPage/>}/>
		<Route path="/game" element={<GamePage/>}/>
		<Route path="*" element={<Navigate to="/"/>}/>
	</Routes>
  )
}

export default App
