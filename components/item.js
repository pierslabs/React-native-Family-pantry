/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './stylesComponents/item.styles'

// eslint-disable-next-line react/prop-types
const ItemComponent = ({
	name,
	id,
	navigation,
	onLongPress,
	width,
	onPress,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => onPress()}
				onLongPress={() => onLongPress()}
			>
				<Text style={[styles.text, { width: width }]}>{name}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ItemComponent
