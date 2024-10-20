import { useCallback, useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

export const useTrackPlayerVolume = () => {
	const [volume, setVolume] = useState<number>(1.0) // Set default volume to 1.0

	const getVolume = useCallback(async () => {
		const currentVolume = await TrackPlayer.getVolume()
		setVolume(currentVolume)
	}, [])

	const updateVolume = useCallback(async (newVolume: number) => {
		if (newVolume < 0 || newVolume > 1) return

		setVolume(newVolume)
		await TrackPlayer.setVolume(newVolume)
		console.log(`Volume updated to: ${newVolume}`)
	}, [])
	useEffect(() => {
		getVolume()
	}, [getVolume])

	return { volume, updateVolume }
}
