import React, { useContext } from 'react'
import { userContext } from '../context/auth.context'
import { View, Text } from 'react-native'

const Pantry = () => {
	const token = useContext(userContext)
	console.log(token)

	return (
		<View>
			<Text>Pantryu</Text>
		</View>
	)
}

export default Pantry
