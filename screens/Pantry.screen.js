/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
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
	Image,
} from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles } from './styles/Pantry.styles'
import ItemComponent from '../components/item'
import List from '../components/List'
import Modal from '../components/Modal'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { linear } from 'react-native/Libraries/Animated/Easing'
import { ThemeContext } from '../context/auth.context'
import ThemeSwitch from '../components/ThemeSwitch'

// eslint-disable-next-line react/prop-types
const Pantry = ({ navigation }) => {
	const { theme } = useContext(ThemeContext)

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
			title: 'Listas',
			headerStyle: {
				backgroundColor: '#00000078',
			},
			tabBarVisible: false,
			headerTransparent: true,
			headerTintColor: linear,
			headerTitleStyle: {
				fontWeight: 'bold',
				fontSize: 20,
				color: '#faf8f1',
				borderWidth: 3,
			},

			headerRight: () => (
				<View
					style={{
						flexDirection: 'row',
						width: Dimensions.get('window').width - 150,
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View>
						<ThemeSwitch />
					</View>
					<TouchableOpacity
						onPress={async () => {
							await AsyncStorage.removeItem('token')
							navigation.navigate('Home')
						}}
						style={theme ? styles.logTouch : styles.logTouchDark}
					>
						<Text style={theme ? styles.textLog : styles.textLogDark}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			),
		})
		getPantrys()
	}, [])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={
					theme
						? require('../assets/taskswallpaper.jpg')
						: require('../assets/skullwallpaper.jpg')
				}
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
					<Text style={theme ? styles.text : styles.textDark}>
						Quieres eliminar esta cesta?
					</Text>
				</Modal>
				{theme ? (
					<View style={styles.btnConatiner}>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => setModalVisible(!modalDeleteVisible)}
						>
							<Text style={styles.btntext}>+</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={theme ? styles.btnConatiner : styles.btnConatinerDark}>
						<TouchableOpacity
							style={theme ? styles.btn : styles.btnDark}
							onPress={() => setModalVisible(!modalDeleteVisible)}
						>
							<Image
								style={styles.imageDark}
								width={20}
								height={20}
								source={require('../assets/add.png')}
							/>
						</TouchableOpacity>
					</View>
				)}
				<Modal
					visible={modalVisible}
					visibility={setModalVisible}
					submit={formik.handleSubmit}
				>
					<Text style={theme ? styles.text : styles.textDark}>
						Añade una nueva cesta
					</Text>
					<TextInput
						onChangeText={formik.handleChange('name')}
						value={formik.values.name}
						placeholder='Nueva cesta'
						style={theme ? styles.input : styles.inputDark}
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
