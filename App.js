import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserProvider from './context/auth.context'
import Home from './screens/Home.screen'
import Login from './screens/Login.screen'
import SignUp from './screens/SignUp.screen'
import Pantry from './screens/Pantry.screen'
import { linear } from 'react-native/Libraries/Animated/Easing'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Products from './screens/Products.screen'
// creamos el stack navigator

const Stack = createNativeStackNavigator()

const App = () => {
	const [token, setToken] = useState()

	const getToken = async () => {
		const userToken = await AsyncStorage.getItem('token')
		setToken(userToken)
	}

	useEffect(() => {
		getToken()
	})
	return (
		<UserProvider>
			<NavigationContainer>
				{token ? (
					<Stack.Navigator>
						<Stack.Screen name='Pantry' component={Pantry} />
						<Stack.Screen name='Products' component={Products} />
					</Stack.Navigator>
				) : (
					<Stack.Navigator>
						<Stack.Screen
							name='Home'
							component={Home}
							options={{
								title: 'Family tasks',
								headerStyle: {
									backgroundColor: '#258a85',
								},
								headerTintColor: linear,
								headerTitleStyle: {
									fontWeight: 'bold',
									fontSize: 30,
									color: '#ddd',
								},
							}}
						/>
						<Stack.Screen name='Pantry' component={Pantry} />
						<Stack.Screen name='Products' component={Products} />

						<Stack.Screen
							name='SignUp'
							component={SignUp}
							options={{
								title: 'Regístrate',
								headerStyle: {
									backgroundColor: '#258a85',
								},
								headerTintColor: linear,
								headerTitleStyle: {
									fontWeight: 'bold',
									fontSize: 20,
									color: '#ddd',
								},
							}}
						/>
						<Stack.Screen
							name='Login'
							component={Login}
							options={{
								title: 'Login',
								headerStyle: {
									backgroundColor: '#258a85',
								},
								headerTintColor: linear,
								headerTitleStyle: {
									fontWeight: 'bold',
									fontSize: 20,
									color: '#ddd',
								},
							}}
						/>
					</Stack.Navigator>
				)}
			</NavigationContainer>
		</UserProvider>
	)
}

export default App
