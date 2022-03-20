/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './stylesComponents/item.styles'

// eslint-disable-next-line react/prop-types
const ItemComponent = ({ name, id, navigation, onLongPress, width }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate('Products', { id: id })}
				onLongPress={() => onLongPress()}
			>
				<Text style={styles.text} width={width}>
					{name}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ItemComponent
