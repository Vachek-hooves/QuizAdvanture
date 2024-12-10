import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ProviderContext} from './store/context';

import {WelcomeScreen} from './Screen/StackScreen';

const Stack = createNativeStackNavigator();
function App(){

  return (
    <ProviderContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderContext>
  );
}


export default App;
