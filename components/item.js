/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './stylesComponents/item.styles'
import { ThemeContext } from '../context/auth.context'

// eslint-disable-next-line react/prop-types
const ItemComponent = ({ name, onLongPress, width, onPress }) => {
	const { theme } = useContext(ThemeContext)

	return (
		<View style={theme ? styles.container : styles.containerDark}>
			<TouchableOpacity
				onPress={() => onPress()}
				onLongPress={() => onLongPress()}
			>
				{theme ? (
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
				) : (
					<ImageBackground
						source={require('../assets/navbar.jpg')}
						resizeMode='cover'
						style={styles.image}
					>
						<Text
							style={[
								styles.textDark,
								{
									width: width,
								},
							]}
						>
							{name}
						</Text>
					</ImageBackground>
				)}
			</TouchableOpacity>
		</View>
	)
}

export default ItemComponent
