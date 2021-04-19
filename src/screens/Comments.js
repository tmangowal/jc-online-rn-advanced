import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "pink",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginHorizontal: 4
  },
})

const Comments = () => {

  const dispatch = useDispatch();
  const globalAuth = useSelector((state) => state.auth)

  const changeGlobalState = () => {
    // const newUsername = "tim"

    // AsyncStorage.setItem("username", newUsername)
    // .then(() => {
    //   dispatch({
    //     type: "CHANGE_USERNAME",
    //     payload: newUsername
    //   })
    // })
    // .catch(() => {
    //   console.log("Error")
    // })
  }

  const loadGlobalState = () => {
    // AsyncStorage.getItem("username")
    // .then((value) => {
    //   dispatch({
    //     type: "CHANGE_USERNAME",
    //     payload: value
    //   })
    // })
    // .catch(() => {
    //   console.log("Error")
    // })
  }

  useEffect(() => {
    loadGlobalState();
  }, [])

  return (
    <View style={{ height: "100%", backgroundColor: "lightblue" }}>
      <Text>All Comments Screen</Text>
      <Text>Username: {globalAuth.username} </Text>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
        <TouchableOpacity onPress={changeGlobalState} style={{ ...styles.btn }}>
          <Text>Change global state</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.btn }}>
          <Text>Reset global state</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Comments