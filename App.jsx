import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/home';
import ProfileScreen from './src/screens/profile';
import MyRecipesScreen from './src/screens/resepku';
import AddRecipeForm from './src/screens/tambahresep';
import { Home2, AddSquare, User, Book } from 'iconsax-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFE4EC',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
        tabBarActiveTintColor: '#FF6F91',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home2 size={24} color={color} variant="Bold" />,
        }}
      />
      <Tab.Screen
        name="ResepKu"
        component={MyRecipesScreen}
        options={{
          tabBarIcon: ({ color }) => <Book size={24} color={color} variant="Bold" />,
        }}
      />
      <Tab.Screen
        name="Tambah"
        component={AddRecipeForm}
        options={{
          tabBarIcon: ({ color }) => <AddSquare size={24} color={color} variant="Bold" />,
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={24} color={color} variant="Bold" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        {/* Tidak perlu stack ulang MyRecipesScreen karena sudah di Tab */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
