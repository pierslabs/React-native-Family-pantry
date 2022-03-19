/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './stylesComponents/item.styles'

// eslint-disable-next-line react/prop-types
const ItemComponent = ({ name, id, navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Products', { id: id })}
			>
				<Text style={styles.text}>{name}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ItemComponent
