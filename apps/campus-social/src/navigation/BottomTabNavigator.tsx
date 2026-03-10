import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeFeedScreen from '../screens/HomeFeedScreen';
import GroupsHubScreen from '../screens/GroupsHubScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import TabBar from '../components/TabBar';

export type BottomTabParamList = {
  Home: undefined;
  Groups: undefined;
  Events: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeFeedScreen} />
      <Tab.Screen name="Groups" component={GroupsHubScreen} />
      {/* @ts-ignore - placeholder component matching Event type is fine for now */}
      <Tab.Screen name="Events" component={HomeFeedScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}
