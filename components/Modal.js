import React, { useContext } from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native'
import { styles } from './stylesComponents/Modal.styles'
import { Ionicons } from '@expo/vector-icons'
import { ThemeContext } from '../context/auth.context'

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ children, visible, visibility, submit }) => {
	const { theme } = useContext(ThemeContext)
	return (
		<View style={styles.centeredView}>
			<Modal animationType='fade' transparent={true} visible={visible}>
				<View style={theme ? styles.modalView : styles.modalViewDark}>
					{children}
					<View style={theme ? styles.btnContainer : styles.btnContainerDark}>
						<TouchableOpacity style={styles.btn} onPress={submit}>
							{theme ? (
								<Ionicons
									name='md-checkmark-circle-outline'
									size={45}
									color='#21eb0f'
								/>
							) : (
								<Image
									style={styles.imageDark}
									width={20}
									height={20}
									source={require('../assets/bull.png')}
								/>
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => visibility(!visible)}
						>
							{theme ? (
								<Ionicons name='md-exit' size={45} color='#c53a21' />
							) : (
								<Ionicons name='skull-outline' size={45} color='#c53a21' />
							)}
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default ModalComponent
