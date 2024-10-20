import { colors } from '@/constants/tokens'
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume'
import { utilsStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'

export const PlayerVolumeBar: React.FC<ViewProps> = ({ style }) => {
	const { volume, updateVolume } = useTrackPlayerVolume()

	const progress = useSharedValue(volume ?? 0.5) // Initialize with the current volume
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	// Function to handle volume updates
	const handleVolumeChange = (value: number) => {
		console.log(`Volume changed to: ${value}`)
		updateVolume(value)
	}
	return (
		<View style={style}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />

				<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10 }}>
					<Slider
						progress={progress}
						minimumValue={min}
						containerStyle={utilsStyles.slider}
						onValueChange={handleVolumeChange}
						renderBubble={() => null}
						theme={{
							maximumTrackTintColor: colors.maximumTrackTintColor,
							minimumTrackTintColor: colors.minimumTrackTintColor,
						}}
						thumbWidth={0}
						maximumValue={max}
					/>
				</View>

				<Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
			</View>
		</View>
	)
}
