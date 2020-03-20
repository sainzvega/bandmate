import 'react-native-gesture-handler';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthProvider, useAuth} from './AuthContext';
import SignInScreen from './screens/SignIn';
import HomeScreen from './screens/Profile';

const Stack = createStackNavigator();

function Navigation() {
  const {state} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
