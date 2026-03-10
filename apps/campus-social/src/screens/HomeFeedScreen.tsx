import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../navigation/BottomTabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const STORIES = [
  { id: '1', name: 'My Story', isUser: true, imageUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: '2', name: 'Alex', imageUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
  { id: '3', name: 'Jordan', imageUri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop' },
  { id: '4', name: 'Taylor', imageUri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop' },
  { id: '5', name: 'Morgan', imageUri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
];

const FEED_ITEMS = [
  {
    id: '1',
    author: 'Casey Miller',
    time: '2 hours ago • Campus Events',
    content: "Who's ready for the live music and food trucks? See you all at the main quad! #CampusLife #SpringFest",
    imageUri: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=450&fit=crop',
    title: 'Excited for the upcoming Spring Festival!',
    isEvent: true,
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    author: 'Jamie Chen',
    time: '45 minutes ago • Study Groups',
    content: "Found a great quiet spot in the old library for finals prep. There's coffee and plenty of outlets if anyone wants to join! 📚☕️",
    likes: 128,
    comments: 14,
    shares: 3,
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  }
];

export default function HomeFeedScreen({ navigation }: Props) {
  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <View className="flex-row items-center gap-2">
          <View className="bg-primary p-1.5 rounded-lg items-center justify-center">
            <MaterialIcons name="school" size={24} color="white" />
          </View>
          <Text className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Campus Social</Text>
        </View>
        <TouchableOpacity className="p-2 hover:bg-primary/10 rounded-full transition-colors">
          <MaterialIcons name="search" size={24} color="#334155" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Stories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-6" contentContainerStyle={{ gap: 16 }}>
          {STORIES.map(story => (
            <View key={story.id} className="items-center gap-2 shrink-0">
              <View className="relative">
                <View className={`w-16 h-16 rounded-full p-0.5 border-2 ${story.isUser ? 'border-primary border-dashed' : 'border-primary'} items-center justify-center`}>
                  <Image source={{ uri: story.imageUri }} className="w-full h-full rounded-full object-cover" />
                </View>
                {story.isUser && (
                  <View className="absolute bottom-0 right-0 bg-primary rounded-full p-0.5 border-2 border-white dark:border-background-dark">
                    <MaterialIcons name="add" size={14} color="white" />
                  </View>
                )}
              </View>
              <Text className="text-xs font-medium text-slate-900 dark:text-slate-100">{story.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Create Post Input */}
        <View className="px-4 mb-6">
          <View className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-primary/5">
            <View className="flex-row items-center gap-3">
              <Image source={{ uri: STORIES[0].imageUri }} className="w-10 h-10 rounded-full object-cover" />
              <TextInput
                className="flex-1 bg-background-light dark:bg-slate-800 border-none rounded-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300"
                placeholder="Share something with your campus..."
                placeholderTextColor="#94a3b8"
              />
            </View>
            <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <View className="flex-row gap-4">
                <TouchableOpacity className="flex-row items-center gap-1.5">
                  <MaterialIcons name="image" size={20} color="#94a3b8" />
                  <Text className="text-xs font-medium text-slate-500">Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center gap-1.5">
                  <MaterialIcons name="videocam" size={20} color="#94a3b8" />
                  <Text className="text-xs font-medium text-slate-500">Video</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center gap-1.5">
                  <MaterialIcons name="location-on" size={20} color="#94a3b8" />
                  <Text className="text-xs font-medium text-slate-500">Check-in</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="bg-primary px-4 py-1.5 rounded-full shadow-lg shadow-primary/20">
                <Text className="text-white text-xs font-bold">Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Feed */}
        <View className="px-4 space-y-6">
          {FEED_ITEMS.map(item => (
            <View key={item.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-primary/5 mb-6">
              {item.isEvent && item.imageUri && (
                <View className="relative w-full aspect-video">
                  <Image source={{ uri: item.imageUri }} className="w-full h-full object-cover" />
                  <View className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-bold uppercase tracking-wider">Upcoming Event</Text>
                  </View>
                </View>
              )}

              <View className="p-4">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-2">
                    <Image source={{ uri: item.authorAvatar }} className="w-8 h-8 rounded-full" />
                    <View>
                      <Text className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.author}</Text>
                      <Text className="text-[10px] text-slate-400">{item.time}</Text>
                    </View>
                  </View>
                  <MaterialIcons name="more-horiz" size={20} color="#94a3b8" />
                </View>

                {item.title && <Text className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{item.title}</Text>}

                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {item.content}
                </Text>

                {item.isEvent ? (
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row -space-x-2">
                      <View className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white dark:border-slate-900" />
                      <View className="w-7 h-7 rounded-full bg-slate-400 border-2 border-white dark:border-slate-900" />
                      <View className="w-7 h-7 rounded-full bg-slate-500 border-2 border-white dark:border-slate-900" />
                      <View className="w-7 h-7 rounded-full bg-primary/10 border-2 border-white dark:border-slate-900 items-center justify-center">
                        <Text className="text-[10px] font-bold text-primary">+42</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="bg-primary px-6 py-2 rounded-xl">
                      <Text className="text-white text-sm font-bold">Join Event</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <MaterialIcons name="favorite" size={20} color="#00a870" />
                      <Text className="text-primary text-xs font-bold">{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <MaterialIcons name="chat-bubble" size={20} color="#64748b" />
                      <Text className="text-slate-500 text-xs font-bold">{item.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1.5">
                      <MaterialIcons name="share" size={20} color="#64748b" />
                      <Text className="text-slate-500 text-xs font-bold">{item.shares}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
