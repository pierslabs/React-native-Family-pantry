/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import React, { useState, useContext } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ImageBackground,
	ActivityIndicator,
} from 'react-native'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles/Login.style'
import { ThemeContext } from '../context/auth.context'

const Login = ({ navigation }) => {
	const { theme } = useContext(ThemeContext)
	const [isLoading, setIsloading] = useState(false)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Correo invalido')
				.required('Este campo es obligatorio'),
			password: Yup.string()
				.min(6, 'El password debe tener min 6 caracteres')
				.required('Este campo es obligatorio'),
		}),
		onSubmit: async (x) => {
			try {
				setIsloading(true)
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
				setIsloading(false)
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
			source={
				theme
					? require('../assets/tasks.jpg')
					: require('../assets/cemneteryLogin.jpg')
			}
			resizeMode='cover'
			style={styles.image}
			blurRadius={3}
		>
			<View style={theme ? styles.infoContainer : styles.infoContainerDark}>
				<View style={theme ? styles.card : styles.cardDark}>
					<Text style={theme ? styles.title : styles.titleDark}>
						Iniciar Sesión
					</Text>
					<TextInput
						onChangeText={formik.handleChange('email')}
						value={formik.values.email}
						placeholder='Email'
						style={theme ? styles.input : styles.inputDark}
					/>
					{formik.errors.email && formik.touched.email ? (
						<Text
							style={{
								color: '#9b2121',
								marginBottom: 10,
							}}
						>
							{formik.errors.email}
						</Text>
					) : null}
					<TextInput
						onChangeText={formik.handleChange('password')}
						value={formik.values.password}
						placeholder='Password'
						style={theme ? styles.input : styles.inputDark}
					/>
					{isLoading ? (
						<ActivityIndicator size='large' color='#0d69f3' />
					) : null}
					{formik.errors.password && formik.touched.password ? (
						<Text
							style={{
								color: '#9b2121',
								marginBottom: 10,
							}}
						>
							{formik.errors.password}
						</Text>
					) : null}
					<View style={styles.btnConatiner}>
						<TouchableOpacity onPress={formik.handleSubmit}>
							<Text style={theme ? null : styles.textDark}>Iniciar Sesión</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Toast />
			</View>
		</ImageBackground>
	)
}

export default Login
