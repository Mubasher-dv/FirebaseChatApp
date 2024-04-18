import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { formatDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatItem = ({ item, noBorder, navigation, currentUser }) => {

    const openChatRoom = () => {
        navigation.navigate('chatroom', {
            data: item?.item
        })
    }

    const [lastMessage, setLastMessage] = useState(undefined)

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.item?.userId);
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data()
            });
            setLastMessage(allMessages[0] ? allMessages[0] : null)
        })

        return unsub;
    }, [])

    const renderTime = () => {
        if (lastMessage) {
            let date = lastMessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000))
        }
    }

    const renderLastMessage = () => {
        if (typeof lastMessage == 'undefined') return 'Loading...'
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return 'You: ' + lastMessage?.text;
            return lastMessage?.text
        } else {
            return 'Say Hi '
        }
    }

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
            <FastImage
                source={item?.item?.profileURL ? { uri: item?.profileURL } : require('../assets/images/avatar.png')}
                style={{ height: hp(6), aspectRatio: 1 }}
                className='rounded-full'
            />

            {/* name and last message */}
            <View className='flex-1 gap-2'>
                <View className='flex-row justify-between'>
                    <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-800'>{item?.item?.username}</Text>
                    <Text style={{ fontSize: hp(1.6) }} className='font-medium text-neutral-500'>
                        {renderTime()}
                    </Text>
                </View>
                <Text style={{ fontSize: hp(1.6) }} className='font-medium text-neutral-500'>
                    {renderLastMessage()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem