import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserLoginScreen from './app/Screen/auth/UserLoginScreen';
import RegisterScreen from './app/Screen/auth/RegisterScreen';
import SendPasswordResetEmailScreen from './app/Screen/auth/SendPasswordResetEmailScreen';
import HomeScreen from './app/Screen/HomeScreen';
import RegisterTrabajadorScreen from './app/Screen/auth/RegisterTrabajadorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // Obtener el token del almacenamiento local
    const token = await AsyncStorage.getItem('token');

    if (token) {
      // Redirigir al usuario a la pantalla de inicio con el Drawer
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#8200d6' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="UserLoginScreen"
          component={UserLoginScreen}
          options={{ title: 'Inicio de Sesion' }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: 'Registro', headerBackVisible: false }}
        />
        <Stack.Screen
          name="RegisterTrabajadorScreen"
          component={RegisterTrabajadorScreen}
          options={{ title: 'Registro Trabajador', headerBackVisible: false }}
        />
        <Stack.Screen
          name="SendPasswordResetEmailScreen"
          component={SendPasswordResetEmailScreen}
          options={{ title: '¿Olvidaste tu contraseña?', headerBackVisible: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}