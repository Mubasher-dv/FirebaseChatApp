import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../Context/authContext';

const SignIn = ({ navigation }) => {

    const { login } = useAuth()

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {

        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', 'please fill all the fields')
            return;
        }

        setLoading(true)
        const response = await login(emailRef.current, passwordRef.current)
        setLoading(false);

        if (response.success) {
            navigation.navigate('home')
        }

        if (!response.success) {
            Alert.alert('Sign In', response.msg)
        }

    }

    return (
        <CustomKeyboardView>
            <StatusBar barStyle={'dark-content'} />
            <View className='flex-1 gap-12'>
                <View className='items-center'>
                    <Image
                        source={require('../assets/images/login.png')}
                        style={{ height: hp(25), width: wp(45) }}
                    // resizeMode='contain'
                    />
                </View>

                <View className='gap-5 mr-4'>
                    <Text
                        style={{ fontSize: hp(4) }}
                        className='font-bold text-center tracking-wider text-neutral-800'
                    >
                        Sign In
                    </Text>

                    {/* inputs */}
                    <View className='gap-4'>
                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
                            <MaterialCommunityIcons name='gmail' size={hp(2.7)} color='gray' />
                            <TextInput
                                style={{ fontSize: hp(2) }}
                                onChangeText={value => emailRef.current = value}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Enter Your Email Address'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
                            <MaterialCommunityIcons name='lock' size={hp(2.7)} color='gray' />
                            <TextInput
                                style={{ fontSize: hp(2) }}
                                onChangeText={value => passwordRef.current = value}
                                className='flex-1 font-semibold text-neutral-700'
                                placeholder='Enter Your Password'
                                secureTextEntry
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-right text-neutral-600'>Forgot Password?</Text>
                    </View>

                    <View>
                        {
                            !loading ? (
                                <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.1) }} className='bg-indigo-500 rounded-xl justify-center items-center'>
                                    <Text
                                        style={{ fontSize: hp(2.7) }}
                                        className='font-bold text-white tracking-wider'
                                    >
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View className='flex-row justify-center'>
                                    <Loading size={hp(12)} />
                                </View>
                            )
                        }
                    </View>

                    {/* signUp text */}
                    <View className='flex-row justify-center'>
                        <Text style={{ fontSize: hp(1.9) }} className='text-neutral-600 font-semibold'>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('register')}>
                            <Text style={{ fontSize: hp(1.9) }} className='text-neutral-600 font-semibold text-indigo-500'>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </CustomKeyboardView >

    )
}

export default SignIn