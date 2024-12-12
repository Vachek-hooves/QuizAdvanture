import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ProviderContext} from './store/context';
import {StackQuizLevelGameScreen, WelcomeScreen} from './Screen/StackScreen';
import TabNavigation from './Navigation/TabNavigation';
import StackArticleDetails from './Screen/StackScreen/StackArticleDetails';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <ProviderContext>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 600,
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen
            name="StackQuizLevelGameScreen"
            component={StackQuizLevelGameScreen}
          />
          <Stack.Screen
            name="StackArticleDetails"
            component={StackArticleDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderContext>
  );
}

export default App;
