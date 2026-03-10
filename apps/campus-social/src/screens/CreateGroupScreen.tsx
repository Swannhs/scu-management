import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateGroup'>;

export default function CreateGroupScreen({ navigation }: Props) {
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-background-dark">
      <Header
        title="Create New Group"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {/* Progress Indicator */}
          <View className="flex-row items-center justify-center gap-3 py-5">
            <View className="h-2 w-2 rounded-full bg-primary" />
            <View className="h-2 w-2 rounded-full bg-primary/20" />
            <View className="h-2 w-2 rounded-full bg-primary/20" />
            <View className="h-2 w-2 rounded-full bg-primary/20" />
          </View>

          <View className="mb-6">
            <Text className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight pb-2">
              Group Details
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-sm">
              Step 1 of 4: Basic Information
            </Text>
          </View>

          {/* Form Fields */}
          <View className="gap-6 pb-6">
            {/* Group Name */}
            <View>
              <Text className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">Group Name</Text>
              <TextInput
                className="w-full rounded-xl text-slate-900 dark:text-slate-100 border border-primary/20 bg-white dark:bg-slate-800/50 h-14 px-4 text-base"
                placeholder="Enter your campus group name"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Description */}
            <View>
              <Text className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">Description</Text>
              <TextInput
                multiline
                numberOfLines={4}
                className="w-full rounded-xl text-slate-900 dark:text-slate-100 border border-primary/20 bg-white dark:bg-slate-800/50 min-h-[128px] p-4 text-base text-left align-top"
                placeholder="What is this group about? (e.g. goals, activities)"
                placeholderTextColor="#94a3b8"
                textAlignVertical="top"
              />
            </View>

            {/* Privacy Settings */}
            <View>
              <Text className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-3">Privacy Settings</Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setPrivacy('public')}
                  className={`flex-1 p-4 rounded-xl border ${privacy === 'public' ? 'border-primary bg-primary/5 border-[2px]' : 'border-primary/10 bg-white dark:bg-slate-800/50 border-[1px]'}`}
                >
                  <MaterialIcons name="public" size={24} color={privacy === 'public' ? '#00a870' : '#94a3b8'} className="mb-2" />
                  <Text className="font-bold text-slate-900 dark:text-slate-100 mt-2">Public</Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">Anyone can join and see posts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setPrivacy('private')}
                  className={`flex-1 p-4 rounded-xl border ${privacy === 'private' ? 'border-primary bg-primary/5 border-[2px]' : 'border-primary/10 bg-white dark:bg-slate-800/50 border-[1px]'}`}
                >
                  <MaterialIcons name="lock" size={24} color={privacy === 'private' ? '#00a870' : '#94a3b8'} className="mb-2" />
                  <Text className="font-bold text-slate-900 dark:text-slate-100 mt-2">Private</Text>
                  <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">Approval required to join</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Cover Photo */}
            <View>
              <Text className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">Cover Photo</Text>
              <TouchableOpacity className="w-full aspect-video rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 items-center justify-center">
                <MaterialIcons name="add-a-photo" size={36} color="#00a870" className="mb-2" />
                <Text className="text-sm font-medium text-primary mt-2">Upload Group Cover</Text>
                <Text className="text-xs text-slate-400 mt-1">Recommended size: 1200x675</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View className="p-4 pb-8 border-t border-primary/5 bg-background-light dark:bg-background-dark">
          <TouchableOpacity className="w-full bg-primary rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <Text className="text-white font-bold text-base">Continue</Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
