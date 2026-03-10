import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList>;

const TABS = ['All', 'Requests', 'Mentions'];

const NOTIFICATIONS_TODAY = [
  {
    id: '1',
    type: 'request',
    user: 'Alex Rivers',
    action: 'sent you a friend request',
    time: '2 minutes ago',
    avatarUri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    icon: 'person-add',
    iconColor: 'bg-primary'
  },
  {
    id: '2',
    type: 'reaction',
    user: 'Sarah Chen',
    action: 'loved your photo in',
    target: 'Campus Life 2024',
    time: '15 minutes ago',
    avatarUri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    icon: 'favorite',
    iconColor: 'bg-rose-500'
  },
  {
    id: '3',
    type: 'invite',
    user: 'Marcus Thorne',
    action: 'invited you to join',
    target: 'Green Tech Innovation Hub',
    time: '1 hour ago',
    avatarUri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop',
    icon: 'groups',
    iconColor: 'bg-amber-500'
  }
];

const NOTIFICATIONS_YESTERDAY = [
  {
    id: '4',
    type: 'comment',
    user: 'Elena Grace',
    action: 'commented on your post: "This is exactly what the student council was talking about!"',
    time: 'Yesterday, 4:32 PM',
    avatarUri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    icon: 'comment',
    iconColor: 'bg-blue-500',
    opacity: true
  },
  {
    id: '5',
    type: 'group_activity',
    action: 'New announcement in',
    target: 'Design Department: Mid-term portfolio reviews schedule released.',
    time: 'Yesterday, 11:15 AM',
    isGroup: true,
    icon: 'campaign',
    iconColor: 'bg-primary/10 text-primary',
    opacity: true
  }
];

export default function NotificationsScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView  className="flex-1 bg-background-light dark:bg-background-dark border-x border-primary/10">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
             onPress={() => navigation.goBack()}
             className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
          >
            <MaterialIcons name="arrow-back" size={20} color="#00a870" />
          </TouchableOpacity>
          <Text className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            Notifications
          </Text>
        </View>
        <TouchableOpacity className="px-2 py-1 rounded hover:bg-primary/5 transition-colors">
          <Text className="text-primary text-sm font-semibold">Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View className="bg-background-light dark:bg-background-dark border-b border-primary/10 px-4">
        <View className="flex-row gap-8">
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`items-center justify-center pb-3 pt-4 border-b-2 ${activeTab === tab ? 'border-primary' : 'border-transparent'}`}
            >
              <Text className={`text-sm tracking-wide ${activeTab === tab ? 'font-bold text-primary' : 'font-semibold text-slate-500 dark:text-slate-400'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content Area */}
      <ScrollView className="flex-1 pb-20" showsVerticalScrollIndicator={false}>
        {/* Today */}
        <View className="px-4 py-3 bg-primary/5">
          <Text className="text-primary text-xs font-bold uppercase tracking-widest">Today</Text>
        </View>

        {NOTIFICATIONS_TODAY.map((notif) => (
          <View key={notif.id} className="flex-row items-start gap-4 bg-background-light dark:bg-background-dark px-4 py-4 border-b border-primary/5">
            <View className="relative shrink-0">
              <View className="h-12 w-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden">
                <Image source={{ uri: notif.avatarUri }} className="w-full h-full object-cover" />
              </View>
              <View className={`absolute -bottom-1 -right-1 ${notif.iconColor} rounded-full p-0.5 flex items-center justify-center border-2 border-background-light dark:border-background-dark`}>
                <MaterialIcons name={notif.icon as any} size={14} color="white" />
              </View>
            </View>

            <View className="flex-1 gap-2">
              <View>
                <Text className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-snug">
                  <Text className="font-bold">{notif.user}</Text> {notif.action} {notif.target && <Text className="font-bold">{notif.target}</Text>}
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-xs mt-1">{notif.time}</Text>
              </View>
              {notif.type === 'request' && (
                <View className="flex-row gap-2 mt-1">
                  <TouchableOpacity className="flex-1 items-center justify-center rounded-lg h-9 bg-primary">
                    <Text className="text-white text-sm font-bold">Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 items-center justify-center rounded-lg h-9 bg-primary/10">
                    <Text className="text-primary text-sm font-bold">Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
              {notif.type === 'invite' && (
                <TouchableOpacity className="w-full items-center justify-center rounded-lg h-9 bg-primary/10 mt-1">
                  <Text className="text-primary text-sm font-bold">View Invite</Text>
                </TouchableOpacity>
              )}
            </View>
            {notif.type !== 'invite' && (
               <View className="h-2 w-2 rounded-full bg-primary mt-2" />
            )}
          </View>
        ))}

        {/* Yesterday */}
        <View className="px-4 py-3 bg-primary/5">
          <Text className="text-primary text-xs font-bold uppercase tracking-widest">Yesterday</Text>
        </View>

        {NOTIFICATIONS_YESTERDAY.map((notif) => (
           <View key={notif.id} className="flex-row items-start gap-4 bg-background-light dark:bg-background-dark px-4 py-4 border-b border-primary/5 opacity-80">
              <View className="relative shrink-0">
                {notif.isGroup ? (
                   <View className="h-12 w-12 rounded-full bg-primary/10 items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
                      <MaterialIcons name={notif.icon as any} size={24} color="#00a870" />
                   </View>
                ) : (
                   <>
                      <View className="h-12 w-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden">
                        <Image source={{ uri: notif.avatarUri }} className="w-full h-full object-cover" />
                      </View>
                      <View className={`absolute -bottom-1 -right-1 ${notif.iconColor} rounded-full p-0.5 flex items-center justify-center border-2 border-background-light dark:border-background-dark`}>
                        <MaterialIcons name={notif.icon as any} size={14} color="white" />
                      </View>
                   </>
                )}
              </View>

              <View className="flex-1">
                 <Text className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-snug">
                   {notif.user && <Text className="font-bold">{notif.user} </Text>}
                   {notif.action}
                   {notif.target && <Text className="font-bold"> {notif.target}</Text>}
                 </Text>
                 <Text className="text-slate-500 dark:text-slate-400 text-xs mt-1">{notif.time}</Text>
              </View>
           </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
