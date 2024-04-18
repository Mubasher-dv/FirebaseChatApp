import { RefreshControl, View } from 'react-native'
import React, { useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import ChatItem from './ChatItem'
import { useNavigation } from '@react-navigation/native'

const ChatList = ({ users, currentUser }) => {
    const navigation = useNavigation()

    return (
        <View className='flex-1'>
            <FlashList
                data={users}
                contentContainerStyle={{ paddingVertical: 25, flex: 1 }}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) =>
                    <ChatItem
                        item={item}
                        noBorder={index + 1 == users.length}
                        navigation={navigation}
                        currentUser={currentUser}
                    />
                }
            />
        </View>
    )
}

export default ChatList