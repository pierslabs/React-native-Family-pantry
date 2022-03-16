import { Dimensions } from 'react-native'

export const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItem: 'center',
	},
	text: {
		fontSize: 30,
		width: Dimensions.get('window').width - 30,
		height: 60,
		backgroundColor: '#187',
		margin: 5,
		textAlign: 'center',
		borderRadius: 15,
		color: '#ccc',
	},
}
