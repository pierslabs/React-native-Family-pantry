/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TextInput,
} from 'react-native'
import { userContext } from '../context/auth.context'
import List from '../components/List'
import Modal from '../components/Modal'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { styles } from './styles/Pantry.styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Products = ({ navigation, route }) => {
	const { id } = route.params
	const user = useContext(userContext)
	const [products, setProduct] = useState()
	const [modalVisible, setModalVisible] = useState(false)
	const [isLoading, setIsloading] = useState(false)

	const formik = useFormik({
		initialValues: {
			name: '',
			cuantity: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Este campo es obligatorio'),
			cuantity: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (x) => {
			try {
				setIsloading(true)
				const res = await fetch(
					`https://node-api-family-pantry.vercel.app/${id}/product`,
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
							Authorization: `${user.userToken}`,
						},
						body: JSON.stringify(x),
					}
				)
				const data = await res.json()
				setModalVisible(false)
				setIsloading(false)

				formik.values.name = ''
				formik.values.cuantity = ''
				getPantry()
				return Toast.show({
					type: 'success',
					text1: `Nueva producto ${data.name} añadido!!`,
					visibilityTime: 2000,
				})
			} catch (error) {
				return Toast.show({
					type: 'error',
					text1: `Hemos tenido un error`,
					visibilityTime: 2000,
				})
			}
		},
	})

	const getPantry = async () => {
		setIsloading(true)
		const getPantry = await fetch(
			`https://node-api-family-pantry.vercel.app/pantry/${id}`,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: `${user.userToken}`,
				},
			}
		)
		const data = await getPantry.json()
		setProduct(data.products)
		setIsloading(false)
	}

	useEffect(() => {
		getPantry()
	}, [])

	return (
		<View style={styles.container}>
			{getPantry.loading ? (
				<ActivityIndicator size='large' color='#0d69f3' />
			) : (
				<>
					<List>
						<FlatList
							data={products}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => (
								<View style={styles.productContanier}>
									<Text style={styles.cuantity}>{item.name}</Text>
									<Text style={styles.cuantity}>{item.cuantity}</Text>
								</View>
							)}
						/>
					</List>
					<View>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.btntext}>+</Text>
						</TouchableOpacity>
					</View>
					<Modal
						visible={modalVisible}
						visibility={setModalVisible}
						submit={formik.handleSubmit}
					>
						<Text style={styles.text}> Añade un producto</Text>
						<TextInput
							onChangeText={formik.handleChange('name')}
							value={formik.values.name}
							placeholder='Nueva cesta'
							style={styles.input}
						/>
						{formik.errors.name && formik.touched.name ? (
							<Text style={{ color: '#9b2121' }}>{formik.errors.name}</Text>
						) : null}
						<TextInput
							onChangeText={formik.handleChange('cuantity')}
							value={formik.values.cuantity}
							placeholder='Cantidad'
							style={styles.input}
						/>
						{formik.errors.cuantity && formik.touched.cuantity ? (
							<Text style={{ color: '#9b2121' }}>{formik.errors.cuantity}</Text>
						) : null}
						{isLoading ? (
							<ActivityIndicator size='large' color='#0d69f3' />
						) : null}
					</Modal>
					<Toast />
				</>
			)}
		</View>
	)
}

export default Products
