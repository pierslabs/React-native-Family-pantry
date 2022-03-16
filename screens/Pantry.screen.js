import React, { useState, useContext, useEffect } from 'react'
import { userContext } from '../context/auth.context'

import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'

import ItemComponent from '../components/item'
import List from '../components/List'
import Modal from '../components/Modal'
import { styles } from './styles/Pantry.styles'

const Pantry = () => {
	const user = useContext(userContext)

	const [modalVisible, setModalVisible] = useState(false)
	const [userPantrys, setPantrys] = useState()

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
	}, [])

	return (
		<View style={styles.container}>
			<List>
				<FlatList
					data={userPantrys}
					renderItem={({ item }) => (
						<ItemComponent id={item.id} name={item.name} />
					)}
					keyExtractor={(item) => item.name}
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
			<Modal visible={modalVisible} visibility={setModalVisible}>
				<Text style={styles.text}> Añade una nueva cesta</Text>
				<TextInput style={styles.input} placeholder='Cesta' />
			</Modal>
		</View>
	)
}

export default Pantry
