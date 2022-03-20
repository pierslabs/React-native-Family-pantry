import React from 'react'
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import { styles } from './stylesComponents/Modal.styles'

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
							<Text>Si</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => visibility(!visible)}
						>
							<Text>Cerrar ventana</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default ModalComponent
