import { View, Text, StatusBar, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import Loading from '../components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../Context/authContext';

const SignUp = ({ navigation }) => {

  const { register } = useAuth()

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const usernameRef = useRef('');
  const profilePicRef = useRef('');
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {

    try {
      if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
        Alert.alert('Sign Up', 'please fill all the fields')
        return;
      }

      setLoading(true);

      let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profilePicRef.current)
      setLoading(false);

      console.log('got result: ', response);

      if (response.success) {
        navigation.navigate('home')
      }

      if (!response.success) {
        Alert.alert('Sign UP', response.msg)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        profilePicRef.current = imageUri;
      }
    });
  };

  return (
    <CustomKeyboardView>
      <StatusBar barStyle={'dark-content'} />
      <View className='flex-1 gap-12'>
        <View className='items-center'>
          <Image
            source={require('../assets/images/register.png')}
            style={{ height: hp(20), width: wp(45) }}
          // resizeMode='contain'
          />
        </View>

        <View className='gap-5 mr-4'>
          <Text
            style={{ fontSize: hp(4) }}
            className='font-bold text-center tracking-wider text-neutral-800'
          >
            Sign Up
          </Text>

          {/* inputs */}
          <View className='gap-4'>

            <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <MaterialCommunityIcons name='account' size={hp(2.7)} color='gray' />
              <TextInput
                style={{ fontSize: hp(2) }}
                onChangeText={value => usernameRef.current = value}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Enter User Name'
                placeholderTextColor={'gray'}
              />
            </View>

            <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <MaterialCommunityIcons name='gmail' size={hp(2.7)} color='gray' />
              <TextInput
                style={{ fontSize: hp(2) }}
                onChangeText={value => emailRef.current = value}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Enter Email Address'
                placeholderTextColor={'gray'}
              />
            </View>

            <View style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <MaterialCommunityIcons name='lock' size={hp(2.7)} color='gray' />
              <TextInput
                style={{ fontSize: hp(2) }}
                onChangeText={value => passwordRef.current = value}
                className='flex-1 font-semibold text-neutral-700'
                placeholder='Enter Password'
                secureTextEntry
                placeholderTextColor={'gray'}
              />
            </View>

            <TouchableOpacity onPress={() => openImagePicker} style={{ height: hp(7) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <MaterialCommunityIcons name='file-image' size={hp(2.7)} color='gray' />
              <Text style={{ fontSize: hp(1.8) }} className='font-bold tracking-wider'>Select Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <View>
            {
              !loading ? (
                <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.1) }} className='bg-indigo-500 rounded-xl justify-center items-center'>
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className='font-bold text-white tracking-wider'
                  >
                    Sign Up
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
            <Text style={{ fontSize: hp(1.9) }} className='text-neutral-600 font-semibold'>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={{ fontSize: hp(1.9) }} className='text-neutral-600 font-semibold text-indigo-500'>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </CustomKeyboardView >
  )
}

export default SignUp