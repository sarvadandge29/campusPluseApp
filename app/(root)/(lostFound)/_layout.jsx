import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllRequests from './allRequests';
import CreateRequest from './createRequest';

const Tab = createMaterialTopTabNavigator();

const LostFoundLayout = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarIndicatorStyle: { backgroundColor: '#000' },
        }}
      >
        <Tab.Screen name="All Requests" component={AllRequests} />
        <Tab.Screen name="Create Request" component={CreateRequest} />
      </Tab.Navigator>
  );
};

export default LostFoundLayout;
