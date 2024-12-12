import {StyleSheet, Text, View, TouchableOpacity, AppState} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TabMapScreen,
  TabProfile,
  TabStatiscticScreen,
} from '../Screen/TabScreen';
import TabArticles from '../Screen/TabScreen/TabArticles';
import {useState, useEffect} from 'react';
import {
  toggleBackgroundMusic,
  setupPlayer,
  pauseBackgroundMusic,
  playBackgroundMusic,
} from '../config/soundSetUp';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [isPlayMusic, setIsPlayMusic] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });
    const initMusic = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsPlayMusic(true);
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const handlePlayMusicToggle = () => {
    const newState = toggleBackgroundMusic();
    setIsPlayMusic(newState);
    // setIsPlayMusic(prev => !prev);
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
        tabBarIconStyle: {
          // fontSize: 36,
          width: 50,
          height: 50,
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
              style={{
                backgroundColor: focused ? '#B4E0FF' : null,
                padding: 5,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 30, color}}>👤</Text>
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
            <View
              style={{
                backgroundColor: focused ? '#B4E0FF' : null,
                padding: 5,
                borderRadius: 10,
              }}>
              {/* <Text style={{fontSize: 32, color}}>🗺️</Text> */}
              <Text style={{fontSize: 32, color}}>🏛️</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabStatiscticScreen"
        component={TabStatiscticScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({focused, color}) => (
            <View
              style={{
                backgroundColor: focused ? '#B4E0FF' : null,
                padding: 5,
                borderRadius: 10,
              }}>
              {/* <Text style={{fontSize: 32, color}}>📊</Text> */}
              <Text style={{fontSize: 32, color}}>🏆</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TabArticle"
        component={TabArticles}
        options={{
          tabBarLabel: 'Articles',
          tabBarIcon: ({focused, color}) => (
            <View
              style={{
                backgroundColor: focused ? '#B4E0FF' : null,
                padding: 5,
                borderRadius: 10,
              }}>
              {/* <Text style={{fontSize: 32, color}}>📚</Text> */}
              <Text style={{fontSize: 32, color}}>📜</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={EmptyComponent}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: ({focused, color}) => (
            <View
              style={{
                backgroundColor: isPlayMusic ? '#B4E0FF' : null,
                padding: 5,
                borderRadius: 10,
              }}>
              <TouchableOpacity onPress={handlePlayMusicToggle}>
                <Text style={{fontSize: 32, color}}>🎶</Text>
              </TouchableOpacity>
            </View>
          ),

          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            color: isPlayMusic ? '#B4E0FF' : '#666',
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
