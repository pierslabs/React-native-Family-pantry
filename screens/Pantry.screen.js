/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
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
import { linear } from 'react-native/Libraries/Animated/Easing'

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

				formik.values.name = ''
				getPantrys()
				setModalVisible(false)
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

			getPantrys()
			setModalDeleteVisible(false)
			Toast.show({
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

	useEffect(() => {
		navigation.setOptions({
			title: 'Mis Listas',
			headerStyle: {
				backgroundColor: '#258a85',
			},
			headerTintColor: linear,
			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 30,
				color: '#ddd',
			},
			headerRight: () => (
				<TouchableOpacity
				onPress={async () => {
					await AsyncStorage.removeItem('token')
					navigation.navigate('Home')
				}}
				style={{
					flexDirection: 'row',
					alignItems: 'flex-end',
					justifyContent: 'flex-end',
					width: 100,
				}}
			>
				<Text style={{ fontSize: 20, color: '#ec940f', fontWeight: '600' }}>
					Logout
				</Text>
				<Ionicons name='arrow-redo-outline' size={35} color='#ec940f' />
			</TouchableOpacity>
			),
		})
		getPantrys()
	}, [])
	console.log(pantrys)
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
							<ActivityIndicator size={80} color='#2262d8' />
						</View>
					) : (
						<FlatList
							data={pantrys}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => (
								<ItemComponent
									name={item.name}
									navigation={navigation}
									onPress={() =>
										navigation.navigate('Products', {
											id: item._id,
											name: item.name,
										})
									}
									width={Dimensions.get('window').width - 30}
									onLongPress={() => {
										setPantryId(item._id)
										setModalDeleteVisible(!modalDeleteVisible)
									}}
								/>
							)}
						/>
					)}
				</List>
				<Modal
					visible={modalDeleteVisible}
					visibility={setModalDeleteVisible}
					submit={deletePantry}
				>
					<Text style={styles.text}>Quieres eliminar esta cesta? </Text>
					{/* {isLoading ? (
						<View style={styles.loader}>
							<ActivityIndicator size={80} color='#2262d8' />
						</View>
					) : null} */}
				</Modal>
				<View style={styles.btnConatiner}>
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
		</View>
	)
}

export default Pantry
