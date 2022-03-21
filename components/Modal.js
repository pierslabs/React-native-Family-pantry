import React from 'react'
import { View, Modal, TouchableOpacity, Alert } from 'react-native'
import { styles } from './stylesComponents/Modal.styles'
import { Ionicons } from '@expo/vector-icons'

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ children, visible, visibility, submit }) => {
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType='fade'
				transparent={true}
				visible={visible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
					visibility(!visible)
				}}
			>
				<View style={styles.modalView}>
					{children}
					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.btn} onPress={submit}>
							<Ionicons
								name='md-checkmark-circle-outline'
								size={45}
								color='#21eb0f'
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => visibility(!visible)}
						>
							<Ionicons name='md-exit' size={45} color='#c53a21' />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default ModalComponent
