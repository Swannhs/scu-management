import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const TABS = ['Posts', 'Friends', 'Groups', 'Media'];

const PROFILE_DATA = {
  name: 'Alex Johnson',
  department: 'Computer Science Department',
  studentId: 'CS-2024-0891',
  bio: "Passionate about AI, hiking, and campus hackathons. Let's build something cool!",
  stats: [
    { label: 'Posts', value: '142' },
    { label: 'Friends', value: '892' },
    { label: 'Groups', value: '12' }
  ],
  coverUri: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=300&fit=crop',
  avatarUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop'
};

const POSTS = [
  {
    id: '1',
    author: 'Alex Johnson',
    time: '2 hours ago',
    content: 'Just finished the mid-semester hackathon project! AI-driven study planner is finally live. 🚀',
    imageUri: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    likes: 48,
    comments: 12
  }
];

export default function UserProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <SafeAreaView  className="flex-1 bg-white dark:bg-background-dark">
      <Header
        title="Campus Social"
        onBackPress={() => navigation.goBack()}
        rightActionIcon="more-vert"
        onRightActionPress={() => {}}
      />

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <View className="h-48 w-full bg-primary/20">
          <Image source={{ uri: PROFILE_DATA.coverUri }} className="w-full h-full object-cover" />
        </View>

        {/* Profile Info Overlay */}
        <View className="px-4 -mt-16 z-10">
          <View className="items-center">
            {/* Avatar */}
            <View className="p-1 bg-white dark:bg-background-dark rounded-full shadow-lg">
              <View className="h-32 w-32 rounded-full border-4 border-white dark:border-background-dark overflow-hidden">
                <Image source={{ uri: PROFILE_DATA.avatarUri }} className="w-full h-full object-cover" />
              </View>
            </View>

            {/* Name & Badge */}
            <View className="mt-4 items-center">
              <Text className="text-2xl font-bold text-slate-900 dark:text-slate-100">{PROFILE_DATA.name}</Text>
              <Text className="text-primary font-medium mt-1">{PROFILE_DATA.department}</Text>
              <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">Student ID: {PROFILE_DATA.studentId}</Text>
            </View>

            {/* Bio */}
            <Text className="mt-4 px-6 text-center text-slate-600 dark:text-slate-300 leading-relaxed">
              {PROFILE_DATA.bio}
            </Text>

            {/* Stats */}
            <View className="flex-row gap-8 mt-6 py-4 w-full justify-center border-y border-slate-100 dark:border-slate-800">
              {PROFILE_DATA.stats.map(stat => (
                <View key={stat.label} className="items-center">
                  <Text className="font-bold text-slate-900 dark:text-slate-100">{stat.value}</Text>
                  <Text className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Actions */}
            <View className="flex-row gap-3 mt-6 w-full px-4">
              <TouchableOpacity className="flex-1 h-12 rounded-xl bg-primary text-white items-center justify-center flex-row gap-2 shadow-md shadow-primary/20">
                <MaterialIcons name="edit" size={20} color="white" />
                <Text className="font-bold text-sm text-white">Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 h-12 rounded-xl bg-primary/10 text-primary items-center justify-center flex-row gap-2">
                <MaterialIcons name="share" size={20} color="#00a870" />
                <Text className="font-bold text-sm text-primary">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="mt-8 border-b border-slate-100 dark:border-slate-800">
          <View className="flex-row justify-around">
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-3 border-b-2 ${activeTab === tab ? 'border-primary' : 'border-transparent'}`}
              >
                <Text className={`text-sm ${activeTab === tab ? 'font-semibold text-primary' : 'font-semibold text-slate-400'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content Area */}
        <View className="p-4 space-y-4 mb-20">
          {activeTab === 'Posts' && POSTS.map(post => (
            <View key={post.id} className="p-4 rounded-xl bg-background-light dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <View className="flex-row items-center gap-3 mb-3">
                <Image source={{ uri: PROFILE_DATA.avatarUri }} className="h-10 w-10 rounded-full" />
                <View>
                  <Text className="font-bold text-sm text-slate-900 dark:text-slate-100">{post.author}</Text>
                  <Text className="text-[10px] text-slate-500 uppercase">{post.time}</Text>
                </View>
              </View>
              <Text className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{post.content}</Text>
              {post.imageUri && (
                <View className="mt-3 rounded-lg h-40 overflow-hidden">
                  <Image source={{ uri: post.imageUri }} className="w-full h-full object-cover" />
                </View>
              )}
              <View className="mt-4 flex-row gap-4 text-slate-400">
                <TouchableOpacity className="flex-row items-center gap-1">
                  <MaterialIcons name="favorite" size={18} color="#94a3b8" />
                  <Text className="text-xs text-slate-500">{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <MaterialIcons name="chat-bubble" size={18} color="#94a3b8" />
                  <Text className="text-xs text-slate-500">{post.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {activeTab !== 'Posts' && (
             <View className="items-center py-8">
                <Text className="text-slate-500">{activeTab} content placeholder</Text>
             </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
