
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import { AuthContext, AuthContextProvider, useAuth } from './src/Context/authContext';
import { MenuProvider } from 'react-native-popup-menu';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Start from './src/screens/Start';
import HomeHeader from './src/components/HomeHeader';
import ChatRoom from './src/screens/ChatRoom';
import ChatRoomHeader from './src/components/ChatRoomHeader';

export const Stack = createNativeStackNavigator()

const Navigation = () => {

  const { isAuthenticated } = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated == 'undefined' ? 'start' : isAuthenticated ? 'home' : 'login'}
      >
        <Stack.Screen name='start' component={Start} options={{ headerShown: false }} />
        <Stack.Screen
          name='home'
          component={Home}
          options={{
            header: () => <HomeHeader />
          }}
        />
        <Stack.Screen name='login' component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name='register' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen
          name='chatroom'
          component={ChatRoom}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App(): React.JSX.Element {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </MenuProvider>
  );
}

export default App;
