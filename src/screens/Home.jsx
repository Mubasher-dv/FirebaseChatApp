import { View, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/authContext'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChatList from '../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../../firebaseConfig';

const Home = ({ navigation }) => {
  const { user } = useAuth();
  console.log(user);

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user?.userId)
      getUsers()
  }, [])

const getUsers = async () => {
  const q = query(userRef, where('userId', '!=', user?.userId));

  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach(doc => {
    data.push({ ...doc.data() })
  })

  console.log('users data: ', data);
  setUsers(data)
}

return (
  <View className='bg-white flex-1'>
    <StatusBar barStyle={'light-content'} />

    {
      users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className='flex-1 items-center' style={{ top: hp(30) }}>
          <ActivityIndicator size={'large'} />
        </View>
      )
    }

  </View>
)
}

export default Home