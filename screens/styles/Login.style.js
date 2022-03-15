import { Dimensions } from 'react-native'
export const styles = {
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	card: {
		width: Dimensions.get('window').width - 20,
		backgroundColor: 'rgba(236, 236, 236, 0.981)',
		padding: 15,
	},
	title: {
		alignSelf: 'center',
		fontSize: 25,
		marginBottom: 10,
	},
	btnHeaderConatiner: {
		marginLeft: 'auto',
		marginTop: 5,
	},
	btn: {
		marginBottom: 10,
		width: 60,
		fontSize: 17,
		color: 'blue',
	},
	btnConatiner: {
		flexDirection: 'row',
		width: Dimensions.get('window').width - 50,
		justifyContent: 'space-around',
		marginBottom: 10,
		marginTop: 25,
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 10,
		alignSelf: 'stretch',
		paddingHorizontal: 5,
	},
}
