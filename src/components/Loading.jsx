import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = ({ size }) => {
    return (
        <View style={{ height: size, aspectRatio: 1 }}>
            <LottieView
                source={require('../assets/animations/loading.json')}
                style={{ flex: 1 }}
                autoPlay
                loop
            />
        </View>
    )
}

export default Loading