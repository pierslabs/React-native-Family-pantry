import { View } from 'react-native'
import React from 'react'
import { styles } from './stylesComponents/List.styles'

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ children }) => {
	return <View style={[styles.modal, {}]}>{children}</View>
}

export default ModalComponent
