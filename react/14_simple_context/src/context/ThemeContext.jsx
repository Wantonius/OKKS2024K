import React from 'react';

export const themes = {
	dark:{
		color:"#FFFFFF",
		backgroundColor:"#595959"
	},
	light:{
		color:"#000000",
		backgroundColor:"#d3d3d3"
	}
}

export const ThemeContext = React.createContext(themes.dark);

ThemeContext.displayName = "ThemeContext";