import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import GroupCard from '../components/GroupCard';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type GroupsHubScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Groups'>,
  NativeStackScreenProps<RootStackParamList>
>;

const CATEGORIES = ['All', 'Academic', 'Clubs', 'Social', 'Sports'];

const MY_GROUPS = [
  { id: '1', name: 'Data Science Study', imageUri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop' },
  { id: '2', name: 'Chess Club', imageUri: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=400&fit=crop' },
  { id: '3', name: 'Campus Podcast', imageUri: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop' },
];

const SUGGESTED_GROUPS = [
  { id: '4', name: 'Morning Yoga Society', members: '1.2k members', imageUri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop' },
  { id: '5', name: 'Tech Entrepreneurs', members: '850 members', imageUri: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&h=300&fit=crop' },
];

const BATCH_GROUPS = [
  { id: '6', name: 'CS Batch 2024', members: '128 Members • 3 new posts', imageUri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop' },
  { id: '7', name: 'Design Society', members: '45 Members • 1 new post', imageUri: 'https://images.unsplash.com/photo-1513364776144-60967f0f80eb?w=150&h=150&fit=crop' },
]

export default function GroupsHubScreen({ navigation }: GroupsHubScreenProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-slate-950">
      <View className="flex-row items-center justify-between px-6 pt-6 pb-2">
        <Text className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Groups</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <MaterialIcons name="notifications" size={24} color="#475569" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 py-4">
        <View className="flex-row items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3">
          <MaterialIcons name="search" size={20} color="#94a3b8" />
          <TextInput
            className="flex-1 ml-2 text-sm text-slate-900 dark:text-slate-100"
            placeholder="Search groups, clubs, or batches"
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 pb-4 mb-4 flex-grow-0" contentContainerStyle={{ gap: 12 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            className={`h-9 items-center justify-center rounded-lg px-5 ${activeCategory === cat ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`}
          >
            <Text className={`text-sm font-semibold ${activeCategory === cat ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView className="flex-1 px-6 pb-24" showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-slate-900 dark:text-white">My Groups</Text>
            <TouchableOpacity><Text className="text-primary text-sm font-semibold">See all</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {MY_GROUPS.map((group) => (
                <GroupCard
                  key={group.id}
                  name={group.name}
                  imageUri={group.imageUri}
                  members=""
                  styleType="horizontal"
                  onPress={() => navigation.navigate('GroupDetail', { groupId: group.id })}
                />
             ))}
          </ScrollView>
        </View>

        <View className="mb-8">
           <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</Text>
          </View>
          {BATCH_GROUPS.map((group) => (
            <GroupCard
              key={group.id}
              name={group.name}
              members={group.members}
              imageUri={group.imageUri}
              onPress={() => navigation.navigate('GroupDetail', { groupId: group.id })}
            />
          ))}
        </View>

        <View className="mb-24">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-slate-900 dark:text-slate-100">Suggested for You</Text>
          </View>
          {SUGGESTED_GROUPS.map((group) => (
             <GroupCard
                key={group.id}
                name={group.name}
                members={group.members}
                imageUri={group.imageUri}
                styleType="suggested"
                onPress={() => {}}
             />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
         onPress={() => navigation.navigate('CreateGroup')}
         className="absolute bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-xl"
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
