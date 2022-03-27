import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ThemeProvider from './context/auth.context'
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
		<ThemeProvider>
			<NavigationContainer>
				{token ? (
					<Stack.Navigator>
						<Stack.Screen name='Pantry' component={Pantry} />
						<Stack.Screen name='Products' component={Products} />
					</Stack.Navigator>
				) : (
					<Stack.Navigator>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Pantry' component={Pantry} />
						<Stack.Screen
							name='Products'
							component={Products}
							options={{
								title: '',
								headerStyle: {
									backgroundColor: '#258a85',
								},
								tabBarVisible: false,
								headerTransparent: true,
								headerTintColor: linear,
								headerTitleStyle: {
									fontWeight: 'bold',
									fontSize: 30,
									color: '#ddd',
								},
							}}
						/>

						<Stack.Screen
							name='SignUp'
							component={SignUp}
							options={{
								headerTitleAlign: 'center',
								title: '',
								headerTransparent: true,
								headerShown: true,
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
								title: '',
								headerTitleAlign: 'center',
								headerTransparent: true,
								headerShown: true,
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
		</ThemeProvider>
	)
}

export default App
