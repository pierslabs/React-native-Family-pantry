import React, { useState, useContext, useEffect } from 'react'
import { userContext } from '../context/auth.context'
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
	ActivityIndicator,
} from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles } from './styles/Pantry.styles'
import ItemComponent from '../components/item'
import List from '../components/List'
import Modal from '../components/Modal'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const Pantry = () => {
	const user = useContext(userContext)

	const [modalVisible, setModalVisible] = useState(false)
	const [userPantrys, setPantrys] = useState()
	const [isLoading, setIsloading] = useState(false)

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (x) => {
			console.log(user.userToken)
			try {
				setIsloading(true)
				const res = await fetch(
					'https://node-api-family-pantry.vercel.app/pantry',
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
							Authorization: `${user.userToken}`,
						},
						body: JSON.stringify(x),
					}
				)
				setIsloading(false)
				const data = await res.json()

				setModalVisible(false)
				formik.values.name = ''

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

	const getPantrys = async () => {
		const pantrys = await fetch(
			'https://node-api-family-pantry.vercel.app/pantrys',
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: `${user.userToken}`,
				},
			}
		)
		const data = await pantrys.json()
		setPantrys(data)
	}

	useEffect(() => {
		getPantrys()
	}, [isLoading])

	return (
		<View style={styles.container}>
			{!userPantrys ? (
				<>
					<Text style={{ textAlign: 'center', fontSize: 70 }}>
						aun no tienes ninguna cesta creada
					</Text>
					<View>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.btntext}>+</Text>
						</TouchableOpacity>
					</View>
				</>
			) : (
				<>
					<List>
						<FlatList
							data={userPantrys}
							renderItem={({ item }) => (
								<ItemComponent id={item.id} name={item.name} />
							)}
							keyExtractor={(item) => item._id}
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
				</>
			)}
		</View>
	)
}

export default Pantry
