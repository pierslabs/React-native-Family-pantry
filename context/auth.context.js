import React, { createContext, useState, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const userContext = createContext()

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
	const [userToken, setToken] = useState()

	const getToken = async () => {
		const token = await AsyncStorage.getItem('token')
		setToken(token)
	}

	useEffect(() => {
		getToken()
	}, [])

	return (
		<userContext.Provider value={{ userToken: userToken }}>
			{children}
		</userContext.Provider>
	)
}

export default UserProvider
