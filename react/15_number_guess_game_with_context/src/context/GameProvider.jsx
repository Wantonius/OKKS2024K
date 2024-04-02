import {useState} from 'react';
import GameContext from './GameContext';
import {useNavigate} from 'react-router-dom';

const GameProvider = (props) => {
	
	const [state,setState] = useState({
		playerName:"",
		noOfGuesses:0,
		minGuess:1,
		maxGuess:100,
		targetNumber:0,
		message:""
	})
	
	const navigate = useNavigate();
	
	const startGame = (name) => {
		if(!name) {
			setState((state) => {
				return {
					...state,
					message:"Please enter your name"
				}
			})
			return;
		}
		const target = Math.floor(Math.random()*100)+1
		const message = "Hello "+name+". Guess a number between "+state.minGuess+" and "+state.maxGuess+"."
		setState((state) => {
			return {
				...state,
				name:name,
				message:message,
				targetNumber:target
			}
		})
		navigate("/game")
	}
}

export default GameProvider;