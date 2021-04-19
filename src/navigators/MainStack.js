import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/Home"
import UserProfile from "../screens/UserProfile"
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'

const style = StyleSheet.create({
  navBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'pink',
    borderRadius: 4,
    alignSelf: 'center',
    marginRight: 24
  },
});

const Stack = createStackNavigator()

const MainStack = () => {
  const globalAuth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logoutBtnHandler = () => {
    AsyncStorage.removeItem('username')
      .then(() => {
        AsyncStorage.getItem("interceptorId")
        .then((interceptorId) => {
          Axios.interceptors.request.eject(parseInt(interceptorId))

          AsyncStorage.removeItem("interceptorId")
          .then(() => {
            dispatch({
              type: 'RESET_USERNAME',
            });
          })
          .catch(() => {
            console.log("Error")
          })
        })
        .catch(() => {
          console.log("Error")
        })

      })
      .catch(() => {
        console.log('Error');
      });
  };

  return (
    <Stack.Navigator initialRouteName="Home">
        {/* Components / Screens */}
      <Stack.Screen component={Home} name="Home" options={{ 
        title: `Hello, ${globalAuth.username}`, 
        headerRight: () => {
          return (
            <TouchableOpacity onPress={logoutBtnHandler} style={{...style.navBtn}}>
              <Text>Logout</Text>
            </TouchableOpacity>
          )
        } }} 
        />
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  )
}

export default MainStack;