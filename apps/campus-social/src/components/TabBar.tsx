import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="absolute bottom-0 left-0 right-0 max-w-md mx-auto z-30 flex-row gap-2 border-t border-primary/10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 pt-3"
      style={{ paddingBottom: insets.bottom + 12 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconMap: Record<string, any> = {
          Home: 'home',
          Groups: 'groups',
          Events: 'event',
          Messages: 'chat-bubble',
          Profile: 'person',
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center gap-1"
          >
            <MaterialIcons
              name={iconMap[route.name] || 'circle'}
              size={24}
              color={isFocused ? '#00a870' : '#94a3b8'} // primary vs slate-400
              style={isFocused ? { ...styles.activeIcon } : {}}
            />
            <Text
              className={`text-[10px] ${
                isFocused ? 'font-bold text-primary' : 'font-medium text-slate-400 dark:text-slate-500'
              }`}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    // Note: react-native-vector-icons doesn't support font-variation-settings out of the box,
    // so we just rely on color for active state, or use a filled variant if available.
  },
});
