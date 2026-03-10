import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface GroupCardProps {
  name: string;
  members: string;
  imageUri: string;
  onPress: () => void;
  styleType?: 'horizontal' | 'list' | 'suggested';
}

export default function GroupCard({ name, members, imageUri, onPress, styleType = 'list' }: GroupCardProps) {
  if (styleType === 'horizontal') {
    return (
      <TouchableOpacity onPress={onPress} className="flex flex-col gap-2 shrink-0 w-32 mr-4">
        <View className="w-32 h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden border border-primary/10">
          <Image source={{ uri: imageUri }} className="w-full h-full object-cover" />
        </View>
        <Text className="text-sm font-bold text-center truncate text-slate-900 dark:text-slate-100">{name}</Text>
      </TouchableOpacity>
    );
  }

  if (styleType === 'suggested') {
    return (
      <View className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-primary/5 shadow-sm mb-4">
        <View className="h-40 w-full overflow-hidden">
          <Image source={{ uri: imageUri }} className="w-full h-full object-cover" />
        </View>
        <View className="p-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="font-bold text-lg text-slate-900 dark:text-slate-100">{name}</Text>
              <Text className="text-slate-500 text-sm">{members}</Text>
            </View>
            <TouchableOpacity className="bg-primary px-4 py-1.5 rounded-full">
              <Text className="text-white text-sm font-bold">Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 shadow-sm mb-4">
      <View className="h-14 w-14 rounded-lg bg-primary/10 items-center justify-center overflow-hidden">
        <Image source={{ uri: imageUri }} className="h-full w-full object-cover" />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-slate-900 dark:text-white">{name}</Text>
        <Text className="text-xs text-slate-500">{members}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} className="text-slate-400" color="#94a3b8" />
    </TouchableOpacity>
  );
}
