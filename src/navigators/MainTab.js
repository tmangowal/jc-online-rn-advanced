import React from 'react';
import { Dimensions } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from './MainStack';
import TopTabNav from './TopTabNav';
import Ionicons from 'react-native-vector-icons/Ionicons'

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "MainStack") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Comments") {
              iconName = focused ? "chatbubble" : "chatbubble-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
        }
      }}
      tabBarOptions={{
        activeTintColor: 'red',
        style: {
          borderRadius: 16,
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16
        }
      }}>
      <BottomTab.Screen
        component={MainStack}
        name="MainStack"
        options={{title: 'Home'}}
      />
      <BottomTab.Screen component={TopTabNav} name="Comments" />
    </BottomTab.Navigator>
  );
};

export default MainTab;
