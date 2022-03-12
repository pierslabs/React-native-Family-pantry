/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { View, Text, Button, ImageBackground, Dimensions } from 'react-native'
import { light } from '../theme/themes'
import ModalComponent from '../components/modal'

const styles = {
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoContainer: {
		height: 300,
		width: Dimensions.get('window').width - 20,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'rgba(236, 236, 236, 0.945)',
		paddingHorizontal: 1,
	},
	title: {
		fontSize: 28,
		color: '#33b603',
		fontWeight: 'bold',
	},
	text: {
		fontSize: 22,
		color: '#742727',
		textAlign: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
}

const Login = ({ navigation }) => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	return (
		<ImageBackground
			source={require('../assets/background.png')}
			resizeMode='cover'
			style={styles.image}
		>
			<View style={styles.infoContainer}>
				<Text light={light} style={styles.title}>
					Bienvenido a Family Tasks
				</Text>
				<Text style={styles.text}>
					Organiza tus tareas de forma sencilla e intuitiva, compartelas y
					añadeles recordatorios.
				</Text>
				<Button
					title='Registrate'
					onPress={() => setIsModalVisible(!isModalVisible)}
				/>
				<ModalComponent
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
				></ModalComponent>
			</View>
		</ImageBackground>
	)
}

export default Login
