import { View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

const styles = {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
}

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ isModalVisible, children }) => {
	return (
		<Modal isVisible={isModalVisible}>
			<View style={styles.container}>{children}</View>
		</Modal>
	)
}

export default ModalComponent
