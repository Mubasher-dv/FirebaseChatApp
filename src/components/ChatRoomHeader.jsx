import { View, Text, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';

const ChatRoomHeader = ({ user, navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerShadowVisible: false,
            headerLeft: () => (
                <View className='flex-row items-center gap-4'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='chevron-left' size={hp(4)} color='#737373' />
                    </TouchableOpacity>

                    <View className='flex-row items-center gap-3'>
                        <FastImage
                            source={user?.profileURL ? user?.profileURL : require('../assets/images/avatar.png')}
                            style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
                        // className='rounded-full'
                        />

                        <Text style={{ fontSize: hp(2.5) }} className='text-neutral-700 font-medium'>
                            {user?.username}
                        </Text>

                    </View>
                </View>
            ),
            headerRight: () => (
                <View className='flex-row items-center gap-8'>
                    <MaterialCommunityIcons name='phone' size={hp(2.8)} color='#737373' />
                    <MaterialCommunityIcons name='video' size={hp(2.8)} color='#737373' />

                </View>
            )
        })
    })
}

export default ChatRoomHeader