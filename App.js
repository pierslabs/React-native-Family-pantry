import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserProvider from './context/auth.context'
import Home from './screens/Home.screen'
import Login from './screens/Login.screen'
import SignUp from './screens/SignUp.screen'
import Pantry from './screens/Pantry.screen'
import { linear } from 'react-native/Libraries/Animated/Easing'
// creamos el stack navigator

const Stack = createNativeStackNavigator()

const App = () => {
	return (
		<UserProvider>
			<NavigationContainer>
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
			</NavigationContainer>
		</UserProvider>
	)
}

export default App
