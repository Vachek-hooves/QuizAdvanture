import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabMapScreen, TabStatiscticScreen} from '../Screen/TabScreen';
import TabArticles from '../Screen/TabScreen/TabArticles';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="TabMapScreen" component={TabMapScreen} />
      <Tab.Screen name="TabStatiscticScreen" component={TabStatiscticScreen} />
      <Tab.Screen name="TabArticle" component={TabArticles} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
