import React from 'react'
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar'

import UserLoginScreen from './app/Screen/auth/UserLoginScreen'
import ShopTab from'./app/Screen/ShopTab'
import RegisterScreen from './app/Screen/auth/RegisterScreen'
import SendPasswordResetEmailScreen from './app/Screen/auth/SendPasswordResetEmailScreen'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 


<stack.Navigator screenOptions={{headerStyle: {backgroundColor:'purple'},headerTintColor:'white'}}>
  
  <stack.Screen name="ShopTab" component={ShopTab} options={{headerShown:false}}/>
  <stack.Screen name="UserLogin" component={UserLoginScreen} 
  options={{title:'Inicio de Sesion'}}/>
  <stack.Screen name="Register" component={RegisterScreen} options={{title:'Registro', headerBackVisible: false}}/>
  <stack.Screen name="SendPasswordResetEmail" component={SendPasswordResetEmailScreen} options={{title:'¿Olvidate tu contraseña?', headerBackVisible: false}}/>
  
  </stack.Navigator>  
    
    </NavigationContainer>
  )}