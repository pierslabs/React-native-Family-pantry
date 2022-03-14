/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import React, { useState } from 'react'
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
import { styles } from './Login.style'

const Login = ({ setIsModalVisible, isModalVisible, navigation }) => {
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
			source={require('../assets/tasks.jpg')}
			resizeMode='cover'
			style={styles.image}
			blurRadius={3}
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
					{isLoading ? (
						<ActivityIndicator size='large' color='#0d69f3' />
					) : null}
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
