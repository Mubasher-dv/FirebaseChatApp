import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Start = ({ navigation }) => {

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        <StatusBar barStyle={'dark-content'} />
        <FastImage source={require('../assets/images/chatlogo.jpg')} style={s.logo} />
        <Text style={{ fontSize: hp(2) }} className='text-neutral-800 font-semibold'>
          Chat to Engage Yourself With Others
        </Text>
        <FastImage
          source={require('../assets/images/chatttt.jpg')}
          style={{ width: wp(80), height: hp(50) }}
        />
        <TouchableOpacity className='bg-indigo-500' onPress={() => {
          navigation.navigate('login')
        }} style={s.buttonContainer}>
          <Text style={s.button}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Start;

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 25,
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 25,
    marginBottom: 25,
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: wp(80),
    alignItems: 'center',
    height: hp(7),
    justifyContent: 'center',
    borderRadius: 10
  },
  button: {
    color: 'white',
    fontSize: hp(3)
  },
  logo: {
    width: 82,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
