import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupDetail'>;

const TABS = ['Feed', 'Members', 'Events', 'Files'];

const POSTS = [
  {
    id: '1',
    author: 'Alex Rivers',
    time: '2 hours ago',
    content: 'Just finished calibrating the new LIDAR sensors for our autonomous rover project. The precision is incredible compared to the old ultrasonic ones! 🤖🛰️',
    imageUri: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop',
    likes: 42,
    comments: 12,
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    author: 'Sarah Chen',
    time: '5 hours ago',
    content: 'Is anyone interested in a weekend workshop on ROS2 fundamentals? I have some materials from the last conference I attended.',
    imageUri: null,
    likes: 18,
    comments: 5,
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  }
];

export default function GroupDetailScreen({ route, navigation }: Props) {
  const [activeTab, setActiveTab] = useState('Feed');

  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-background-dark">
      <Header
        title="Group Details"
        onBackPress={() => navigation.goBack()}
        rightActionIcon="more-vert"
        onRightActionPress={() => navigation.navigate('GroupManagement', { groupId: route.params.groupId })}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full h-[180px]">
          <Image
             source={{ uri: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop' }}
             className="w-full h-full object-cover"
          />
        </View>

        <View className="px-4 -mt-12 z-10">
          <View className="flex-row items-end justify-between">
            <View className="h-28 w-28 rounded-xl border-4 border-background-light dark:border-background-dark shadow-lg bg-white overflow-hidden">
               <Image
                 source={{ uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=300&fit=crop' }}
                 className="w-full h-full object-cover"
               />
            </View>
            <TouchableOpacity className="flex-row items-center justify-center rounded-full h-10 px-5 bg-primary/10 border border-primary/20">
              <MaterialIcons name="check-circle" size={16} color="#00a870" />
              <Text className="text-primary text-sm font-bold ml-1">Joined</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-3">
            <Text className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Robotics Club</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-primary text-sm font-semibold">1,240 Members</Text>
              <Text className="text-slate-400 mx-2">•</Text>
              <Text className="text-slate-500 dark:text-slate-400 text-sm">Public Group</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 border-b border-primary/10">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ gap: 24 }}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`items-center justify-center pb-3 pt-2 border-b-2 ${activeTab === tab ? 'border-primary' : 'border-transparent'}`}
              >
                <Text className={`text-sm ${activeTab === tab ? 'font-bold text-primary' : 'font-medium text-slate-500 dark:text-slate-400'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="p-4 mb-24">
          {activeTab === 'Feed' && (
            <>
              {/* Post Composer */}
              <View className="bg-white dark:bg-slate-800/50 rounded-xl p-4 shadow-sm border border-primary/5 mb-4">
                <View className="flex-row gap-3">
                  <View className="h-10 w-10 rounded-full bg-primary/20 items-center justify-center">
                    <MaterialIcons name="person" size={24} color="#00a870" />
                  </View>
                  <View className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-full px-4 justify-center">
                    <Text className="text-slate-500 text-sm">Start a discussion...</Text>
                  </View>
                </View>
                <View className="flex-row justify-between mt-4 pt-3 border-t border-primary/5">
                  <TouchableOpacity className="flex-row items-center gap-2 px-2 py-1">
                    <MaterialIcons name="image" size={18} color="#00a870" />
                    <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-2 px-2 py-1">
                    <MaterialIcons name="videocam" size={18} color="#00a870" />
                    <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">Video</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-2 px-2 py-1">
                    <MaterialIcons name="event" size={18} color="#00a870" />
                    <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">Event</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Posts */}
              {POSTS.map(post => (
                <TouchableOpacity
                  key={post.id}
                  onPress={() => navigation.navigate('GroupPostDetail', { postId: post.id })}
                  className="bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-sm border border-primary/5 mb-4"
                >
                  <View className="p-4">
                    <View className="flex-row items-center gap-3 mb-3">
                      <Image source={{ uri: post.authorAvatar }} className="h-10 w-10 rounded-full" />
                      <View className="flex-1">
                        <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">{post.author}</Text>
                        <Text className="text-[10px] text-slate-500">{post.time}</Text>
                      </View>
                      <MaterialIcons name="more-horiz" size={20} color="#94a3b8" />
                    </View>
                    <Text className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {post.content}
                    </Text>
                  </View>
                  {post.imageUri && (
                    <Image source={{ uri: post.imageUri }} className="w-full aspect-video object-cover" />
                  )}
                  <View className="p-3 border-t border-primary/5 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <TouchableOpacity className="flex-row items-center gap-1">
                        <MaterialIcons name="favorite" size={20} color="#00a870" />
                        <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">{post.likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-row items-center gap-1">
                        <MaterialIcons name="chat-bubble" size={20} color="#64748b" />
                        <Text className="text-xs font-semibold text-slate-600 dark:text-slate-400">{post.comments}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <MaterialIcons name="share" size={20} color="#64748b" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
