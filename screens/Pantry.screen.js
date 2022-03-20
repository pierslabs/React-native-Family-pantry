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

// eslint-disable-next-line react/prop-types
const Pantry = ({ navigation }) => {
	const user = useContext(userContext)
	const [pantrys, setPantrys] = useState()
	const [pantryId, setPantryId] = useState()
	const [modalVisible, setModalVisible] = useState(false)
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
	const [isLoading, setIsloading] = useState(false)

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Este campo es obligatorio'),
		}),
		onSubmit: async (x) => {
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
		try {
			setIsloading(true)
			await fetch(
				`https://node-api-family-pantry.vercel.app/pantry/${pantryId}`,
				{
					method: 'DELETE',
					headers: {
						'content-type': 'application/json',
						Authorization: `${user.userToken}`,
					},
				}
			)
			setIsloading(false)

			setModalDeleteVisible(false)
			getPantrys()

			return Toast.show({
				type: 'success',
				text1: `LA cesta se ha eliminado correctamente!`,
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
			<List>
				<FlatList
					data={pantrys}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => (
						<ItemComponent
							id={item._id}
							name={item.name}
							navigation={navigation}
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
				<Text>Quieres eliminar la cesta </Text>
				{isLoading ? <ActivityIndicator size='large' color='#0d69f3' /> : null}
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
				{isLoading ? <ActivityIndicator size='large' color='#0d69f3' /> : null}
			</Modal>
			<Toast />
		</View>
	)
}

export default Pantry
