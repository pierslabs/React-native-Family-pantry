/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TextInput,
	ImageBackground,
} from 'react-native'
import List from '../components/List'
import ProductComponent from '../components/product'
import { linear } from 'react-native/Libraries/Animated/Easing'
import Modal from '../components/Modal'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { styles } from './styles/Pantry.styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Products = ({ navigation, route }) => {
	const { id, name } = route.params
	const [products, setProduct] = useState()
	const [productId, setProductId] = useState()
	const [modalVisible, setModalVisible] = useState(false)
	const [isLoading, setIsloading] = useState(true)
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
	const [refreshing, setRefreshing] = useState(false)

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
			const token = await AsyncStorage.getItem('token')
			if (!token) navigation.navigate('Home')
			try {
				setIsloading(true)
				const res = await fetch(
					`https://node-api-family-pantry.vercel.app/${id}/product`,
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
							Authorization: token,
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
					visibilityTime: 3000,
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
		const token = await AsyncStorage.getItem('token')
		if (!token) navigation.navigate('Home')
		const getPantry = await fetch(
			`https://node-api-family-pantry.vercel.app/pantry/${id}`,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: token,
				},
			}
		)
		const data = await getPantry.json()

		data.products.map((x) => (x.selected = false))
		setProduct(data.products)
		setIsloading(false)
	}

	const deletePantry = async () => {
		const token = await AsyncStorage.getItem('token')
		if (!token) navigation.navigate('Home')
		try {
			setIsloading(true)
			await fetch(
				`https://node-api-family-pantry.vercel.app/product/${productId}`,
				{
					method: 'DELETE',
					headers: {
						'content-type': 'application/json',
						Authorization: token,
					},
				}
			)
			setIsloading(false)

			setModalDeleteVisible(false)
			getPantry()

			return Toast.show({
				type: 'success',
				text1: `El producto se ha eliminado correctamente!`,
				visibilityTime: 2000,
			})
		} catch (error) {
			return Toast.show({
				type: 'error',
				text1: `Hemos tenido un error`,
				visibilityTime: 2000,
			})
		}
	}

	useEffect(() => {
		navigation.setOptions({
			title: name,
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: '#258a85',
			},
			headerTintColor: linear,
			headerTitleStyle: {
				fontSize: 30,
				color: '#ddd',
			},
		})
		getPantry()
	}, [isLoading])

	const selectItem = (item) => {
		products.map((product) =>
			product._id === item
				? (product.selected = !product.selected)
				: product.selected
		)
		setProduct(products)
		setRefreshing(!refreshing)
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/taskswallpaper.jpg')}
				resizeMode='cover'
				style={styles.image}
			>
				<List>
					{isLoading ? (
						<View style={styles.loader}>
							<ActivityIndicator size={80} color='#229ed8' />
						</View>
					) : (
						<FlatList
							data={products}
							keyExtractor={(index) => index._id.toString()}
							renderItem={({ item }) => (
								<View style={styles.productContanier}>
									<ProductComponent
										refreshing={refreshing}
										onPress={() => selectItem(item._id)}
										selectItem={item.selected}
										width={350}
										name={`${item.name}  ${item.cuantity} `}
										onLongPress={() => {
											setProductId(item._id)
											setModalDeleteVisible(!modalDeleteVisible)
										}}
									/>
								</View>
							)}
						/>
					)}
				</List>
				<Modal
					visible={modalDeleteVisible}
					visibility={setModalDeleteVisible}
					submit={deletePantry}
				>
					<Text style={styles.text}>Quieres eliminar el Producto ?</Text>
				</Modal>
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
				</Modal>
				<Toast />
			</ImageBackground>
		</View>
	)
}

export default Products
