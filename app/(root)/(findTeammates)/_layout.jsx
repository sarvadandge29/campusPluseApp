import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FindFlatmates from './findFlatmates';
import HackthonGroups from './hackthonGroups';

const Tab = createMaterialTopTabNavigator();

const FindTeammateslayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIndicatorStyle: { backgroundColor: '#000' },
      }}
    >
      <Tab.Screen name="Find Flatmates" component={FindFlatmates} />
      <Tab.Screen name="Hackthon Teams" component={HackthonGroups} />
    </Tab.Navigator>
  )
}

export default FindTeammateslayout