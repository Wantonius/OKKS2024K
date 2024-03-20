import About from './components/About';
import Home from './components/Home';
import Secret from './components/Secret';
import {Routes,Route,Link,Navigate} from 'react-router-dom';

function App() {
 

  return (
    <div style={{textAlign:"center",margin:"auto"}}>
		<ul style={{listStyleType:"none"}}>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/about">About</Link></li>
		</ul>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/about" element={<About/>}/>
			<Route path="/secret" element={<Secret/>}/>
			<Route path="*" element={<Navigate to="/"/>}/>		
		</Routes>
    </div>
  )
}

export default App
