import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { StatusBar } from 'react-native';  // Pour la petite barre tout en haut 

import HomeScreen from './screens/homeScreen';
import SearchScreen from './screens/meteoScreen';
import ProfileScreen from './screens/cocktailScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
            {/* <StatusBar style="light" backgroundColor="#FF6347" />   */ /*La petite barre toute en haut, au dessus du header*/}

      <Tab.Navigator
        initialRouteName="Meteo"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'rose'; //home
            } else if (route.name === 'Meteo') {
              iconName = 'cloud';
            } else if (route.name === 'Cocktail') {
              iconName = 'wine';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: 'black', 
            //borderTopWidth: 0,        
          },
          tabBarActiveTintColor: 'red', 
          tabBarInactiveTintColor: 'gray', 
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
         options={{
          //headerShown: false  //Rendre le header Invisible, Cool mais pas besoin pour l'instant
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: 'pink', 
          headerTitle: 'Home', 
        }}
        />
        <Tab.Screen name="Meteo" component={SearchScreen} 
        options={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: 'pink', 
          headerTitle: 'Méteo', 
        }}/>
        <Tab.Screen name="Cocktail" component={ProfileScreen} 
        options={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: 'pink', 
          headerTitle: 'Cocktail', 
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

