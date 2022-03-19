import { useState, useEffect } from 'react'

const useFetch = (url, options) => {
	const [loading, setloading] = useState(true)
	const [data, setData] = useState()

	const fetchData = async () => {
		const res = await fetch(url, options)
		const dataJson = await res.json()
		setData(dataJson)
		setloading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return { loading, data }
}

export default useFetch
