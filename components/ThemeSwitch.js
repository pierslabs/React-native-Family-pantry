import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/auth.context'
import { Switch, View, StyleSheet, Image } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	imageDark: {
		width: 35,
		height: 35,
	},
	pentContainer: {
		backgroundColor: '#bb4b4b',
		borderRadius: 50,
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
			<Ionicons name='sunny' size={40} color='#d3ad17' />
			<Switch
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				onValueChange={() => changeTheme()}
				value={themeColor}
			/>
			<View style={styles.pentContainer}>
				<Image
					style={styles.imageDark}
					width={20}
					height={20}
					source={require('../assets/pent.png')}
				/>
			</View>
		</View>
	)
}

export default ThemeSwitch
