/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
	ActivityIndicator,
	Dimensions,
	ImageBackground,
} from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles } from './styles/Pantry.styles'
import ItemComponent from '../components/item'
import List from '../components/List'
import Modal from '../components/Modal'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

// eslint-disable-next-line react/prop-types
const Pantry = ({ navigation }) => {
	const [pantrys, setPantrys] = useState({ name: '' })
	const [pantryId, setPantryId] = useState()
	const [modalVisible, setModalVisible] = useState(false)
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
	const [isLoading, setIsloading] = useState(true)

	const getPantrys = async () => {
		const token = await AsyncStorage.getItem('token')
		if (!token) navigation.navigate('Home')

		const pantrys = await fetch(
			'https://node-api-family-pantry.vercel.app/pantrys',
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: token,
				},
			}
		)

		const data = await pantrys.json()

		setPantrys(data)
		setIsloading(false)
	}

	useEffect(() => {
		getPantrys()
	}, [])

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (x) => {
			const token = await AsyncStorage.getItem('token')
			try {
				setIsloading(true)
				const res = await fetch(
					'https://node-api-family-pantry.vercel.app/pantry',
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
							Authorization: token,
						},
						body: JSON.stringify(x),
					}
				)
				setIsloading(false)
				const data = await res.json()

				setModalVisible(false)
				formik.values.name = ''
				getPantrys()

				return Toast.show({
					type: 'success',
					text1: `Nueva cesta ${data.name} añadida!!`,
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

	const deletePantry = async () => {
		const token = await AsyncStorage.getItem('token')
		if (!token) navigation.navigate('Home')
		try {
			setIsloading(true)
			await fetch(
				`https://node-api-family-pantry.vercel.app/pantry/${pantryId}`,
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
			getPantrys()

			return Toast.show({
				type: 'success',
				text1: `La cesta se ha eliminado correctamente!`,
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

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator size='large' color='#0d69f3' />
			) : (
				<ImageBackground
					source={require('../assets/taskswallpaper.jpg')}
					resizeMode='cover'
					style={styles.image}
				>
					<List>
						<FlatList
							data={pantrys}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => (
								<ItemComponent
									name={item.name}
									navigation={navigation}
									onPress={() =>
										navigation.navigate('Products', { id: item._id })
									}
									width={Dimensions.get('window').width - 20}
									onLongPress={() => {
										setPantryId(item._id)
										setModalDeleteVisible(!modalDeleteVisible)
									}}
								/>
							)}
						/>
					</List>
					<Modal
						visible={modalDeleteVisible}
						visibility={setModalDeleteVisible}
						submit={deletePantry}
					>
						<Text style={styles.text}>Quieres eliminar esta cesta? </Text>
						{isLoading ? (
							<ActivityIndicator size='large' color='#0d69f3' />
						) : null}
					</Modal>
					<View>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => setModalVisible(!modalDeleteVisible)}
						>
							<Text style={styles.btntext}>+</Text>
						</TouchableOpacity>
					</View>
					<Modal
						visible={modalVisible}
						visibility={setModalVisible}
						submit={formik.handleSubmit}
					>
						<Text style={styles.text}> Añade una nueva cesta</Text>
						<TextInput
							onChangeText={formik.handleChange('name')}
							value={formik.values.name}
							placeholder='Nueva cesta'
							style={styles.input}
						/>
						{formik.errors.name && formik.touched.name ? (
							<Text style={{ color: '#9b2121' }}>{formik.errors.name}</Text>
						) : null}
						{isLoading ? (
							<ActivityIndicator size='large' color='#0d69f3' />
						) : null}
					</Modal>
					<Toast />
				</ImageBackground>
			)}
		</View>
	)
}

export default Pantry
