import { View, StatusBar, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import ChatRoomHeader from '../components/ChatRoomHeader';
import MessageList from '../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../Context/authContext';
import { getRoomId } from '../utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatRoom = ({ route, navigation }) => {
    const { data } = route?.params;
    const { user } = useAuth()

    // console.log('users: ',user?.userId);

    const textRef = useRef('')
    const inputRef = useRef(null)
    const scrollRef = useRef(null)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        createRoomIfNotExists()

        let roomId = getRoomId(user?.userId, data?.userId);
        const docRef = doc(db, 'rooms', roomId)
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data()
            });
            setMessages([...allMessages])
        })

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',updateScrolling)

        return () => {
            unsub();
            keyboardDidShowListener.remove()
        }
    }, [])

    useEffect(() => {
        updateScrolling()
    },[messages])

    const createRoomIfNotExists = async () => {
        const roomId = getRoomId(user?.userId, data?.userId);
        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;
        try {
            const roomId = getRoomId(user?.userId, data?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current = '';
            if (inputRef) inputRef?.current?.clear();

            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileURL: user?.profileURL,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });

            console.log('new message id: ', newDoc.id);
        } catch (error) {
            Alert.alert('message', error.message)
        }
    }

    const updateScrolling = () => {
        setTimeout(() => {
            scrollRef?.current?.scrollToEnd({ Animated: true })
        }, 100);
    }

    return (
        <CustomKeyboardView inChat={true}>
            <View className='flex-1 bg-white'>
                <StatusBar barStyle={'dark-content'} />
                <ChatRoomHeader user={data} navigation={navigation} />
                <View className='h-3 border-b border-neutral-300' />
                <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
                    <View className="flex-1">
                        <MessageList scrollRef={scrollRef} messages={messages} currentUser={user} />
                    </View>

                    <View style={{ marginBottom: hp(2.7) }} className='pt-2'>
                        <View className='flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5'>
                            <TextInput
                                ref={inputRef}
                                placeholder='type message....'
                                onChangeText={value => textRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className='flex-1 mr-2'
                            />
                            <TouchableOpacity onPress={handleSendMessage} className='bg-neutral-200 p-2 mr-[1px] rounded-full'>
                                <MaterialCommunityIcons name='send' size={hp(2.7)} color='#737373' />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </CustomKeyboardView>
    )
}

export default ChatRoom;