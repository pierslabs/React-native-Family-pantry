/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { styles } from './styles/Home.style'

const Home = ({ navigation }) => {
	return (
		<ImageBackground
			source={require('../assets/background.png')}
			resizeMode='cover'
			style={styles.image}
		>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>Bienvenido a Family Tasks</Text>
				<Text style={styles.text}>
					Organiza tus tareas de forma sencilla e intuitiva, compartelas y
					añadeles recordatorios.
				</Text>
				<View style={styles.butoonContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text>Login</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text>Registrate</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}

export default Home
