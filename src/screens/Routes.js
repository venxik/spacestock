import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import BuildingDetailsScreen from './BuildingDetailsScreen';
import SearchFilterScreen from './SearchFilterScreen';
import BuildingListScreen from './BuildingListScreen';

const HomeStack = createStackNavigator();

const Root = () => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      initialRouteName={HomeScreen}
      screenOptions={{
        headerShown: false
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="BuildingDetailsScreen"
        component={BuildingDetailsScreen}
      />
      <HomeStack.Screen
        name="SearchFilterScreen"
        component={SearchFilterScreen}
      />
      <HomeStack.Screen
        name="BuildingListScreen"
        component={BuildingListScreen}
      />
    </HomeStack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default Routes;
