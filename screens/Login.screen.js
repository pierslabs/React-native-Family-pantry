/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import React from 'react'
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	TextInput,
	ImageBackground,
} from 'react-native'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = {
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	card: {
		width: Dimensions.get('window').width - 20,
		backgroundColor: 'rgba(236, 236, 236, 0.981)',
		padding: 15,
	},
	title: {
		alignSelf: 'center',
		fontSize: 25,
		marginBottom: 10,
	},
	btnHeaderConatiner: {
		marginLeft: 'auto',
		marginTop: 5,
	},
	btn: {
		marginBottom: 10,
		width: 60,
		fontSize: 17,
		color: 'blue',
	},
	btnConatiner: {
		flexDirection: 'row',
		width: Dimensions.get('window').width - 50,
		justifyContent: 'space-around',
		marginBottom: 10,
		marginTop: 25,
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

const Login = ({ setIsModalVisible, isModalVisible, navigation }) => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Correo invalido').required('requerido'),
			password: Yup.string().min(6, 'El password debe tener min 6 caracteres'),
		}),
		onSubmit: async (x) => {
			try {
				const res = await fetch(
					'https://node-api-family-pantry.vercel.app/login',
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(x),
					}
				)

				const data = await res.json()

				if (!data.token) {
					return Toast.show({
						type: 'error',
						text1: 'Error',
						text2: data,
						visibilityTime: 2000,
					})
				}

				await AsyncStorage.setItem('token', data.token)
				navigation.navigate('Pantry')
			} catch (error) {
				console.log(error)
			}
		},
	})

	return (
		<ImageBackground
			source={require('../assets/background.png')}
			resizeMode='cover'
			style={styles.image}
		>
			<View style={styles.infoContainer}>
				<View style={styles.card}>
					<Text style={styles.title}>Iniciar Sesión</Text>
					<TextInput
						onChangeText={formik.handleChange('email')}
						value={formik.values.email}
						placeholder='Email'
						style={styles.input}
					/>
					{formik.errors.email && formik.touched.email ? (
						<Text style={{ color: '#9b2121' }}>{formik.errors.email}</Text>
					) : null}
					<TextInput
						onChangeText={formik.handleChange('password')}
						value={formik.values.password}
						placeholder='Password'
						style={styles.input}
					/>
					{formik.errors.password && formik.touched.password ? (
						<Text style={{ color: '#9b2121', marginBottom: 10 }}>
							{formik.errors.password}
						</Text>
					) : null}
					<View style={styles.btnConatiner}>
						<TouchableOpacity onPress={formik.handleSubmit}>
							<Text>Iniciar Sesión</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Toast />
			</View>
		</ImageBackground>
	)
}

export default Login
