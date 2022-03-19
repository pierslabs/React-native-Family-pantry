/* eslint-disable react/prop-types */
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
	ActivityIndicator,
} from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { userContext } from '../context/auth.context'
import List from '../components/List'
import ItemComponent from '../components/item'
import Modal from '../components/Modal'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { styles } from './styles/Pantry.styles'

const Products = ({ navigation, route }) => {
	const { id } = route.params
	const user = useContext(userContext)
	const [modalVisible, setModalVisible] = useState(false)
	const [pantryProducts, setProducts] = useState()

	useEffect(() => {
		const products = useFetch(
			`https://node-api-family-pantry.vercel.app/pantry/${id}`,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: `${user.userToken}`,
				},
			}
		)
		setProducts(products)
	}, [])

	console.log(pantryProducts)
	return (
		<View style={styles.container}>
			<List>
				{/* <FlatList
					data={!products.data.products ? '' : products.data.products}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <ItemComponent name={item.name} />}
				/> */}
			</List>
			<View>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<Text style={styles.btntext}>+</Text>
				</TouchableOpacity>
			</View>
			<Modal visible={modalVisible} visibility={setModalVisible}></Modal>
			<Toast />
		</View>
	)
}

export default Products
