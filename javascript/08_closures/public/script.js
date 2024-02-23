window.onload = function() {
	const fontSizer = changeFontSize();
	const biggerButton = document.getElementById("bigger");
	biggerButton.onclick = fontSizer.bigger;
	const smallerButton = document.getElementById("smaller");
	smallerButton.onclick = fontSizer.smaller;
}

const changeFontSize = function(){

	let fontSize = 16;
	document.body.style.fontSize = fontSize+"px";
	
	function changeSize(val) {
		fontSize += val;
		document.body.style.fontSize = fontSize+"px";
	}
	
	return {
		bigger:function() {
			changeSize(2)
		},
		smaller:function() {
			changeSize(-2)
		}
	}
}