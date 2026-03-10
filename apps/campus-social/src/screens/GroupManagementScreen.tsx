import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupManagement'>;

const REQUESTS = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Computer Science Senior',
    imageUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Design & Innovation Sophomore',
    imageUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Marcus Williams',
    role: 'Business Administration PhD',
    imageUri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    role: 'Bioengineering Junior',
    imageUri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop'
  }
];

export default function GroupManagementScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('Join Requests');

  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-background-dark">
      <Header
        title="Group Management"
        onBackPress={() => navigation.goBack()}
        rightActionIcon="settings"
        onRightActionPress={() => {}}
      />

      <View className="px-4 py-3">
        <View className="flex-row items-center bg-primary/10 rounded-xl h-12 shadow-sm">
          <View className="pl-4 pr-2">
             <MaterialIcons name="search" size={20} color="#00a870" />
          </View>
          <TextInput
            className="flex-1 text-slate-900 dark:text-slate-100 text-base"
            placeholder="Find specific members"
            placeholderTextColor="rgba(0, 168, 112, 0.6)" // primary/60
          />
        </View>
      </View>

      <View className="flex-row border-b border-primary/10 px-4">
        <TouchableOpacity
          onPress={() => setActiveTab('Members')}
          className={`flex-1 items-center justify-center pb-3 pt-4 border-b-[3px] ${activeTab === 'Members' ? 'border-primary' : 'border-transparent'}`}
        >
          <Text className={`text-sm tracking-wide ${activeTab === 'Members' ? 'font-bold text-primary' : 'font-semibold text-slate-500 dark:text-slate-400'}`}>
            Members
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('Join Requests')}
          className={`flex-1 items-center justify-center pb-3 pt-4 border-b-[3px] ${activeTab === 'Join Requests' ? 'border-primary' : 'border-transparent'}`}
        >
          <Text className={`text-sm tracking-wide ${activeTab === 'Join Requests' ? 'font-bold text-primary' : 'font-semibold text-slate-500 dark:text-slate-400'}`}>
            Join Requests (8)
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {activeTab === 'Join Requests' && REQUESTS.map((req) => (
          <View key={req.id} className="flex-col gap-3 bg-background-light dark:bg-background-dark px-4 py-4 border-b border-primary/5">
            <View className="flex-row items-center gap-4">
              <View className="h-12 w-12 rounded-full border-2 border-primary/20 overflow-hidden">
                 <Image source={{ uri: req.imageUri }} className="w-full h-full object-cover" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-slate-900 dark:text-slate-100 text-base font-semibold leading-tight">{req.name}</Text>
                <Text className="text-primary text-sm font-medium leading-tight">{req.role}</Text>
              </View>
            </View>
            <View className="flex-row gap-2 mt-1">
              <TouchableOpacity className="flex-1 py-2 px-4 bg-primary rounded-lg items-center justify-center">
                <Text className="text-white font-bold text-sm">Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-2 px-4 bg-primary/10 rounded-lg items-center justify-center">
                <Text className="text-primary font-bold text-sm">Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {activeTab === 'Members' && (
           <View className="p-4 items-center">
             <Text className="text-slate-500 dark:text-slate-400">Members list placeholder</Text>
           </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
