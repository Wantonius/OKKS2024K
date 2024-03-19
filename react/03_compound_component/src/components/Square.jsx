const Square = (props) => {

	const squareStyle = {
		height:150,
		backgroundColor:props.color
	}
	return(
		<div style={squareStyle}></div>
	)
}

export default Square;