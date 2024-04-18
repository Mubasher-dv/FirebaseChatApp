import { View, Text, Platform } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image'
import { useAuth } from '../Context/authContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MenuItem from './CustomMenuItems';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == 'ios';

const HomeHeader = () => {

  const { user, logOut} = useAuth()

  const navigation = useNavigation()

  const handleProfile = () => { }

  const handleLogOut = async () => {
    const response = await logOut()
    if (response.success) {
      navigation.navigate('login')
    }
  }

  return (
    <View className='flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl pt-5'>
      <View>
        <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>Chats</Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger>
            <FastImage
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileURL ? user?.profileURL : require('../assets/images/avatar.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 35,
                marginLeft: -20,
                borderRightColor:'white',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 0},
                width: 150
              }
            }}
          >
            <MenuItem
              text={'Profile'}
              action={handleProfile}
              value={null}
              icon={<MaterialCommunityIcons name='account' size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text={'Sign Out'}
              action={handleLogOut}
              value={null}
              icon={<MaterialCommunityIcons name='logout' size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>


      </View>
    </View>
  )
}

export default HomeHeader;

const Divider = () => {
  return (
    <View className='p-[1px] w-full bg-neutral-200' />
  )
}