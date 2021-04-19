import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  Alert
} from 'react-native';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = 'http://10.0.2.2:2000';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 32,
  },
  textInput: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  loginBtn: {
    backgroundColor: 'navy',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 24,
  },
});

const Register = () => {
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
  });

  const inputHandler = (field, value) => {
    setRegisterForm({
      ...registerForm,
      [field]: value,
    });
  };

  const registerBtnHandler = () => {
    // GET: Check username sudah ada?
    Axios.get(`${API_URL}/users`, {
      params: {
        username: registerForm.username
      }
    })
    .then((res) => {
      if(!res.data.length) {
        Axios.post(`${API_URL}/users`, {
          username: registerForm.username,
          password: registerForm.password
        })
        .then(() => {
          AsyncStorage.setItem("username", registerForm.username)
          .then(() => {
            AsyncStorage.setItem("interceptorId", Axios.interceptors.request.use(
              (request) => {
                request.headers["LOGGED-IN-USER"] = res.data[0].username
  
                return request
              }
            ).toString())
            .then(() => {
              dispatch({
                type: "CHANGE_USERNAME",
                payload: res.data[0].username
              })
            })
            .catch(() => {
              console.log("Interceptor Async Storage Error")
            })
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        // If Android
        ToastAndroid.show("Username has been used", ToastAndroid.SHORT)
        // If iOS
        // Alert.alert("Username has been used")
      }
    })
    .catch((err) => {
      console.log(err)
    })

  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...styles.main}}>
        <View>
          <Text>Username</Text>
          <View style={{...styles.textInput, marginBottom: 12}}>
            <TextInput
              onChangeText={text => inputHandler('username', text)}
              placeholder="Your username"
            />
          </View>
          <Text>Password</Text>
          <View style={{...styles.textInput}}>
            <TextInput
              onChangeText={text => inputHandler('password', text)}
              secureTextEntry
              placeholder="Your password"
            />
          </View>
          <TouchableOpacity onPress={registerBtnHandler} style={{...styles.loginBtn}}>
            <Text style={{color: 'white'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
