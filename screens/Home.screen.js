/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { styles } from './styles/Home.style'
import ThemeSwitch from '../components/ThemeSwitch'
import { ThemeContext } from '../context/auth.context'

const Home = ({ navigation }) => {
	const { theme } = useContext(ThemeContext)

	useEffect(() => {
		navigation.setOptions({
			title: 'Tasker',
			headerStyle: {
				backgroundColor: '#00000078',
			},
			headerTransparent: true,

			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 30,
				color: '#faf8f1',
				borderWidth: 3,
			},

			headerRight: () => (
				<View>
					<ThemeSwitch />
				</View>
			),
		})
	}, [])

	return (
		<ImageBackground
			source={
				theme
					? require('../assets/background.png')
					: require('../assets/skullwallpaper.jpg')
			}
			resizeMode='cover'
			style={styles.image}
		>
			<View style={theme ? styles.infoContainer : styles.infoContainerDark}>
				<Text style={theme ? styles.title : styles.titleDark}>
					Bienvenido a Family Tasks
				</Text>
				<Text style={theme ? styles.text : styles.textDark}>
					Organiza tus tareas de forma sencilla e intuitiva, compartelas y
					añadeles recordatorios.
				</Text>
				<View style={styles.butoonContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={theme ? styles.btn : styles.btnDark}>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text style={theme ? styles.btn : styles.btnDark}>Registrate</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}

export default Home
