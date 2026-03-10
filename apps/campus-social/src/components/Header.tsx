import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightActionIcon?: any;
  onRightActionPress?: () => void;
  subtitle?: string;
}

export default function Header({
  title,
  onBackPress,
  rightActionIcon,
  onRightActionPress,
  subtitle,
}: HeaderProps) {
  return (
    <SafeAreaView  className="bg-white/80 dark:bg-background-dark/80 z-20 border-b border-primary/10">
      <View className="flex-row items-center justify-between p-4 pb-2">
        {onBackPress ? (
          <TouchableOpacity
            onPress={onBackPress}
            className="h-10 w-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          >
            <MaterialIcons name="arrow-back" size={24} className="text-slate-900 dark:text-slate-100" color="black" />
          </TouchableOpacity>
        ) : (
          <View className="h-10 w-10" />
        )}

        <View className="flex-1 px-2 items-center">
          <Text className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight text-center">
            {title}
          </Text>
          {subtitle && (
             <Text className="text-xs text-primary font-medium">{subtitle}</Text>
          )}
        </View>

        {rightActionIcon && onRightActionPress ? (
          <TouchableOpacity
            onPress={onRightActionPress}
            className="h-10 w-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          >
            <MaterialIcons name={rightActionIcon} size={24} className="text-slate-900 dark:text-slate-100" color="black" />
          </TouchableOpacity>
        ) : (
          <View className="h-10 w-10" />
        )}
      </View>
    </SafeAreaView>
  );
}
