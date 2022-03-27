import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/auth.context'
import { Switch, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
})

const ThemeSwitch = () => {
	const { setTheme } = useContext(ThemeContext)
	const [themeColor, setThemeColor] = useState(false)

	const changeTheme = () => {
		themeColor ? setTheme(true) : setTheme(false)
		setThemeColor(!themeColor)
	}

	return (
		<View style={styles.container}>
			<Ionicons name='sunny' size={33} color='#ebbf0f' />
			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				onValueChange={() => changeTheme()}
				value={themeColor}
			/>
			<Ionicons name='skull' size={30} color='#f87307' />
		</View>
	)
}

export default ThemeSwitch
