/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './stylesComponents/item.styles'

// eslint-disable-next-line react/prop-types
const ProductComponent = ({
	name,
	onLongPress,
	width,
	onPress,
	selectItem,
}) => {
	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: selectItem ? '#9e3a3a' : '#21cc46' },
			]}
		>
			<TouchableOpacity
				onPress={() => onPress()}
				onLongPress={() => onLongPress()}
			>
				<Text
					style={[
						styles.text,
						{
							width: width,
						},
					]}
				>
					{name}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default ProductComponent
