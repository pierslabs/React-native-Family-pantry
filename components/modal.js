import { View, Text, Button } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ isModalVisible, setIsModalVisible }) => {
	console.log(isModalVisible)
	return (
		<Modal isVisible={isModalVisible}>
			<View style={{ flex: 1 }}>
				<Text>Hello!</Text>
				<Button
					title='Hide modal'
					onPress={() => setIsModalVisible(!isModalVisible)}
				/>
			</View>
		</Modal>
	)
}

export default ModalComponent
