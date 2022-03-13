/* eslint-disable react/prop-types */
import React from 'react'
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	TextInput,
	ImageBackground,
} from 'react-native'

const styles = {
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: Dimensions.get('window').width - 20,

		backgroundColor: 'rgba(245, 245, 245, 0.974)',
		padding: 15,
	},
	title: {
		alignSelf: 'center',
		fontSize: 25,
		marginBottom: 10,
	},
	btnHeaderConatiner: {
		marginLeft: 'auto',
	},
	btn: {
		marginBottom: 10,
		width: 50,
		fontSize: 17,
		color: 'blue',
	},
	btnConatiner: {
		flexDirection: 'row',
		width: Dimensions.get('window').width - 50,
		justifyContent: 'space-around',
		marginTop: 30,
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 10,
		alignSelf: 'stretch',
		paddingHorizontal: 5,
	},
}

const SignUp = ({ setIsModalVisible, isModalVisible, navigation }) => {
	return (
		<ImageBackground
			source={require('../assets/tasks.jpg')}
			resizeMode='cover'
			style={styles.image}
		>
			<View style={styles.inputContainer}>
				<Text style={styles.title}>Regístrate</Text>
				<TextInput placeholder='Nombre' style={styles.input} />
				<TextInput placeholder='Email' style={styles.input} />
				<TextInput placeholder='Password' style={styles.input} />

				<View style={styles.btnConatiner}>
					<TouchableOpacity onPress={() => console.log('registrase')}>
						<Text>Aceptar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}

export default SignUp
