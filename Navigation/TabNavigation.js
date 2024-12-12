import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabMapScreen,
  TabProfile,
  TabStatiscticScreen,
} from '../Screen/TabScreen';
import TabArticles from '../Screen/TabScreen/TabArticles';
import {useState} from 'react';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [isPlayMusic, setIsPlayMusic] = useState(false);
  console.log(isPlayMusic);
  const handlePlayMusicToggle = () => {
    // const newState = toggleBackgroundMusic();
    // setIsPlayMusic(newState);
    setIsPlayMusic(prev => !prev);
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(12, 45, 72, 0.95)',
          borderTopWidth: 1,
          borderTopColor: '#B4E0FF',
          paddingBottom: 5,
          paddingTop: 8,
          height: 110,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          // marginBottom: 3,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#B4E0FF',
        tabBarInactiveTintColor: '#6B8CA3',
      }}>
      <Tab.Screen
        name="TabProfile"
        component={TabProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <View
              style={{backgroundColor: focused ? 'blue' : null, }}>
              <Text style={{fontSize: 36 ,color}}>👤</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabMapScreen"
        component={TabMapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({focused, color}) => (
            <Text style={{fontSize: 32, color}}>🗺️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="TabStatiscticScreen"
        component={TabStatiscticScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({focused, color}) => (
            <Text style={{fontSize: 32, color}}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="TabArticle"
        component={TabArticles}
        options={{
          tabBarLabel: 'Articles',
          tabBarIcon: ({focused, color}) => (
            <Text style={{fontSize: 32, color}}>📚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={EmptyComponent}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({focused, color}) => (
            <TouchableOpacity onPress={handlePlayMusicToggle}>
              <Text style={{fontSize: 32, color}}>🎶</Text>
            </TouchableOpacity>
          ),

          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            color: isPlayMusic ? '#FF8C00' : '#666',
            marginTop: 5,
          },
        }}
        listeners={{tabPress: e => e.preventDefault()}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const EmptyComponent = () => null;

const styles = StyleSheet.create({});
