import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Messages'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ACTIVE_USERS = [
  { id: '1', name: 'Alex', imageUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: '2', name: 'Sarah', imageUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
  { id: '3', name: 'Jordan', imageUri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop', inactive: true },
  { id: '4', name: 'Mila', imageUri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop', inactive: true },
  { id: '5', name: 'David', imageUri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', inactive: true },
];

const MESSAGES = [
  {
    id: '1',
    name: 'Alex Rivera',
    time: '12:45 PM',
    message: 'Hey, are we still meeting at the library for the study session?',
    unread: 2,
    imageUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    time: '2:14 PM',
    message: 'I uploaded the psychology notes to the shared drive!',
    imageUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: "Basket-Ball Varsity '24",
    time: 'Yesterday',
    message: 'Coach: Practice starts at 5PM sharp tomorrow.',
    isGroup: true
  },
  {
    id: '4',
    name: 'Jordan Smith',
    time: 'Tuesday',
    message: 'That movie was actually pretty good. Thanks for the rec!',
    imageUri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop'
  },
  {
    id: '5',
    name: 'Mila Kunis',
    time: 'Monday',
    message: "Did you finish the lab report yet? I'm stuck on part 3.",
    imageUri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop'
  }
];

export default function MessagesScreen({ navigation }: Props) {
  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-4 pt-6 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <View className="bg-primary/10 p-2 rounded-lg">
              <MaterialIcons name="forum" size={24} color="#00a870" />
            </View>
            <Text className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Messages</Text>
          </View>
          <TouchableOpacity className="p-2 hover:bg-primary/10 rounded-full transition-colors">
            <MaterialIcons name="edit-square" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View className="relative justify-center">
          <View className="absolute left-3 z-10">
             <MaterialIcons name="search" size={20} color="#94a3b8" />
          </View>
          <TextInput
            className="w-full bg-slate-200/50 dark:bg-slate-800/50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all text-slate-900 dark:text-slate-100"
            placeholder="Search conversations..."
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      <View className="px-4 py-4">
        <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Active Now</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
          {ACTIVE_USERS.map((user) => (
            <TouchableOpacity key={user.id} className="items-center gap-1 min-w-[64px]">
              <View className="relative">
                <View className={`h-14 w-14 rounded-full border-2 ${user.inactive ? 'border-primary/20' : 'border-primary'} p-0.5`}>
                  <Image source={{ uri: user.imageUri }} className="w-full h-full rounded-full object-cover" />
                </View>
                {!user.inactive && (
                  <View className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-background-light dark:border-background-dark rounded-full" />
                )}
              </View>
              <Text className="text-[10px] font-medium text-slate-600 dark:text-slate-300">{user.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4 pb-24" showsVerticalScrollIndicator={false}>
        <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Recent Messages</Text>

        <View className="space-y-1">
          {MESSAGES.map((msg) => (
            <TouchableOpacity
              key={msg.id}
              className={`flex-row items-center gap-4 p-3 rounded-2xl mb-2 ${msg.unread ? 'bg-primary/5' : 'bg-transparent hover:bg-slate-200/50'}`}
            >
              <View className="relative shrink-0">
                {msg.isGroup ? (
                   <View className="h-14 w-14 rounded-full bg-primary/10 items-center justify-center">
                      <MaterialIcons name="groups" size={28} color="#00a870" />
                   </View>
                ) : (
                   <Image source={{ uri: msg.imageUri }} className="h-14 w-14 rounded-full object-cover" />
                )}
                {msg.unread && (
                  <View className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full border-2 border-background-light dark:border-background-dark items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">{msg.unread}</Text>
                  </View>
                )}
              </View>

              <View className="flex-1 min-w-0">
                <View className="flex-row justify-between items-baseline mb-0.5">
                  <Text className="text-base font-bold text-slate-900 dark:text-white truncate" numberOfLines={1}>{msg.name}</Text>
                  <Text className={`text-xs ${msg.unread ? 'font-bold text-primary' : 'text-slate-500'}`}>{msg.time}</Text>
                </View>
                <Text className={`text-sm line-clamp-1 ${msg.unread ? 'font-semibold text-slate-900 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`} numberOfLines={1}>
                  {msg.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
