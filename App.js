import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home.screen'
import Login from './screens/Login.screen'
import SignUp from './screens/SignUp.screen'
import Pantry from './screens/Pantry.screen'
import { linear } from 'react-native/Libraries/Animated/Easing'
// creamos el stack navigator

const Stack = createNativeStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{
						title: 'Family tasks',
						headerStyle: {
							backgroundColor: '#b3c46c',
						},
						headerTintColor: linear,
						headerTitleStyle: {
							fontWeight: 'bold',
							fontSize: 30,
						},
					}}
				/>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Pantry' component={Pantry} />
				<Stack.Screen name='SingUp' component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
