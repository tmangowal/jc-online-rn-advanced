import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux'
import MainTab from './MainTab';
import Axios from 'axios'

const Stack = createStackNavigator();

const AppNavigator = () => {

  const globalAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkAuth = () => {
    AsyncStorage.getItem("username")
    .then((value) => {
      AsyncStorage.setItem("interceptorId", Axios.interceptors.request.use(
        (request) => {
          request.headers["LOGGED-IN-USER"] = value

          return request
        }
      ).toString())
      .then(() => {
        dispatch({
          type: "CHANGE_USERNAME",
          payload: value
        })
      })
      .catch(() => {
        console.log("Interceptor Async Storage Error")
      })
    })
    .catch(() => {
      console.log("Error")
    })
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      {
        globalAuth.username ?
          <>
            <Stack.Screen component={MainTab} name="Main" />
          </>
        :
        <>
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Register} name="Register" />
        </>
      }
    </Stack.Navigator>
  )
};

export default AppNavigator