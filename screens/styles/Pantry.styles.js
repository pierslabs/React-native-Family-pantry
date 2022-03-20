import { Dimensions } from 'react-native'

export const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignitems: 'center',
	},

	btn: {
		marginLeft: 'auto',
		margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#06f',
		width: 55,
		height: 55,
		borderRadius: 50,
		borderWidth: 3,
		borderColor: '#aaa',
	},
	btntext: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fff',
	},
	modalInput: {
		position: 'absolute',
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 10,
		alignSelf: 'stretch',
		paddingHorizontal: 5,
	},
	text: {
		marginRight: 'auto',
		fontSize: 20,
		marginBottom: 10,
	},
	btnDeleteContainer: {
		flexDirection: 'row',
		marginLeft: 'auto',
		margin: 10,
		height: 40,
		alignItems: 'center',
		backgroundColor: '#b83e3e',
		paddingHorizontal: 10,
		padding: 5,
		borderRadius: 5,
	},
	textDelete: {
		fontSize: 20,
		color: '#eee',
	},
	productContanier: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		width: Dimensions.get('window').width - 10,
		borderBottomWidth: 1,
		borderColor: '#444',
		paddingTop: 10,
		backgroundColor: '#679',
		margin: 5,
	},
	cuantity: {
		fontSize: 25,
		textShadowColor: '#000',
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 10,
		color: '#fff',
		width: 150,
		textAlign: 'center',
	},
}
