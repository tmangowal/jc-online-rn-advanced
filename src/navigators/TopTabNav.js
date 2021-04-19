import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Comments from "../screens/Comments"
import TopComments from '../screens/TopComments'

const TopTab = createMaterialTopTabNavigator()

const MainTab = () => {
  return (
    <TopTab.Navigator >
      <TopTab.Screen component={Comments} name="AllComments" options={{ title: "All Comments" }} />
      <TopTab.Screen component={TopComments} name="TopComments" options={{ title: "Top Comments"}} />
    </TopTab.Navigator>
  )
}

export default MainTab;