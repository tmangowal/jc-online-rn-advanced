import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  navBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "pink",
    borderRadius: 4
  }
})


const UserProfile = (props) => {

  const routeParams = props.route.params

  return (
    <View style={{ ...style.mainContainer}}>
      <Text>UserProfile Screen</Text>
      <Text>ID: {routeParams.id}</Text>
      <Text>Username: {routeParams.username}</Text>
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ ...style.navBtn }}>
        <Text>Tap To Navigate</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile