import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(true)

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
