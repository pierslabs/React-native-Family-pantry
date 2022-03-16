import React from 'react'
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import { styles } from './stylesComponents/Modal.styles'

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ children, visible, visibility }) => {
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
						<TouchableOpacity
							style={styles.btn}
							onPress={() => console.log('añadir cesta')}
						>
							<Text>Añadir</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => visibility(!visible)}
						>
							<Text>Cerrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

export default ModalComponent
