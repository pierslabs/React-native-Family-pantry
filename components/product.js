/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './stylesComponents/item.styles'
import { ThemeContext } from '../context/auth.context'

// eslint-disable-next-line react/prop-types
const ProductComponent = ({
	name,
	onLongPress,
	width,
	onPress,
	selectItem,
}) => {
	const { theme } = useContext(ThemeContext)
	return (
		<>
			{theme ? (
				<View
					style={[
						styles.container,
						{ backgroundColor: selectItem ? '#9e3a3a68' : '#21cc46' },
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
			) : (
				<View
					style={[
						styles.container,
						{ backgroundColor: selectItem ? '#6955135c' : '#a5791a' },
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
			)}
		</>
	)
}

export default ProductComponent
