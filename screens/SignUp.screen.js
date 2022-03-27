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
import { styles } from './styles/SignUp.style'
import { ThemeContext } from '../context/auth.context'

const SignUp = ({ setIsModalVisible, isModalVisible, navigation }) => {
	const { theme } = useContext(ThemeContext)
	const [isLoading, setIsloading] = useState(false)
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.min(2, 'El nombre tiene que tener por lo menos 2 carácteres')
				.required('Este campo es obligatorio'),
			email: Yup.string()
				.email('Correo invalido')
				.required('requerido')
				.required('Este campo es obligatorio'),
			password: Yup.string()
				.min(6, 'El password debe tener min 6 caracteres')
				.required('Este campo es obligatorio'),
		}),
		onSubmit: async (x) => {
			setIsloading(true)
			try {
				const res = await fetch(
					'https://node-api-family-pantry.vercel.app/signup',
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(x),
					}
				)
				const data = await res.json()
				setIsloading(false)

				if (data.status === false) {
					return Toast.show({
						type: 'error',
						text1: `Error  ${data.data}`,
						visibilityTime: 2000,
					})
				}

				Toast.show({
					type: 'success',
					text1: `Genial 👏👏👏 Usuario creado correctamente!!!`,
					visibilityTime: 2000,
				})

				setTimeout(() => {
					navigation.navigate('Login')
				}, 2000)
			} catch (error) {
				console.log(error)
			}
		},
	})

	return (
		<ImageBackground
			source={
				theme ? require('../assets/tasks.jpg') : require('../assets/signup.jpg')
			}
			resizeMode='cover'
			style={styles.image}
			blurRadius={theme ? 3 : null}
		>
			<View style={theme ? styles.inputContainer : styles.cardDark}>
				<Text style={theme ? styles.title : styles.titleDark}>Regístrate</Text>
				<TextInput
					onChangeText={formik.handleChange('name')}
					value={formik.values.name}
					placeholder='Nombre'
					style={theme ? styles.input : styles.inputDark}
				/>
				{formik.errors.name && formik.touched.name ? (
					<Text style={{ color: '#9b2121' }}>{formik.errors.name}</Text>
				) : null}
				<Toast />
				<TextInput
					onChangeText={formik.handleChange('email')}
					value={formik.values.email}
					placeholder='Email'
					style={theme ? styles.input : styles.inputDark}
				/>
				{formik.errors.email && formik.touched.email ? (
					<Text style={{ color: '#9b2121' }}>{formik.errors.email}</Text>
				) : null}
				<TextInput
					onChangeText={formik.handleChange('password')}
					value={formik.values.password}
					placeholder='Password'
					style={theme ? styles.input : styles.inputDark}
				/>
				{formik.errors.password && formik.touched.password ? (
					<Text style={{ color: '#9b2121', marginBottom: 10 }}>
						{formik.errors.password}
					</Text>
				) : null}

				{isLoading ? <ActivityIndicator size='large' color='#0d69f3' /> : null}
				<View style={styles.btnConatiner}>
					<TouchableOpacity onPress={formik.handleSubmit}>
						<Text style={theme ? styles.text : styles.textDark}>Aceptar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	)
}

export default SignUp
