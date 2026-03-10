import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
// Import screens as we create them
import GroupDetailScreen from '../screens/GroupDetailScreen';
import GroupManagementScreen from '../screens/GroupManagementScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import GroupPostDetailScreen from '../screens/GroupPostDetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  GroupDetail: { groupId: string };
  GroupManagement: { groupId: string };
  CreateGroup: undefined;
  GroupPostDetail: { postId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      <Stack.Screen name="GroupManagement" component={GroupManagementScreen} />
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <Stack.Screen name="GroupPostDetail" component={GroupPostDetailScreen} />
    </Stack.Navigator>
  );
}
