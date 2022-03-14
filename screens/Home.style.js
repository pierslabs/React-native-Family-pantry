/* eslint-disable react/prop-types */

import { Dimensions } from 'react-native'

export const styles = {
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoContainer: {
		height: 300,
		width: Dimensions.get('window').width - 20,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'rgba(236, 236, 236, 0.945)',
		paddingHorizontal: 1,
	},
	title: {
		fontSize: 28,
		color: '#33b603',
		fontWeight: 'bold',
	},
	text: {
		fontSize: 22,
		color: '#742727',
		textAlign: 'center',
	},
	butoonContainer: {
		width: 400,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
}
