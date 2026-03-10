import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupPostDetail'>;

export default function GroupPostDetailScreen({ navigation, route }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <Header title="Post Detail" onBackPress={() => navigation.goBack()} />
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-slate-500">Post {route.params.postId} detail placeholder.</Text>
      </View>
    </SafeAreaView>
  );
}