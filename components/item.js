import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './stylesComponents/item.styles'

// eslint-disable-next-line react/prop-types
const ItemComponent = ({ name, id }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{name}</Text>
		</View>
	)
}

export default ItemComponent
