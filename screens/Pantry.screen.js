import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Pantry = () => {
	const [token, setToken] = useState()

	const getToken = async () => {
		const token = await AsyncStorage.getItem('token')
		setToken(token)
	}

	console.log(token)

	useEffect(() => {
		getToken()
	}, [])
	return (
		<View>
			<Text>Pantryu</Text>
		</View>
	)
}

export default Pantry
