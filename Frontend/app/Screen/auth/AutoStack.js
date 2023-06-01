import React from "react"
import "react-native-gesture-handler"

import { createDrawerNavigator, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PerfilTrabajador from "./PerfilTrabajador";
import PerfilCliente from "./PerfilCliente";
import UserLoginScreen from "./UserLoginScreen";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AutoStack = () =>{
    return ( 

    <Drawer.Navigator 
    drawerContent={props => <CustomDrawer{...props}/>} 

    screenOptions={{
    headerShown : true, 
    headerStyle: {backgroundColor:'purple'},headerTintColor:'white', 
    drawerActiveBackgroundColor: '#aa18ea',
    drawerActiveTintColor: '#fff',
    drawerInactiveTintColor: '#333',
    drawerLabelStyle: {
    marginLeft: -25,
    fontSize: 15,
    }}}>

    <Drawer.Screen name="Home" component={UserLoginScreen} options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="home-outline" size={22} color={color} />
    )}}/>

    <Drawer.Screen name="Usuario Trabajador" component={PerfilTrabajador}  options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="person-outline" size={22} color={color} />
   
    )}}/>

    <Drawer.Screen name="Usuario Cliente" component={PerfilCliente}  options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="person-outline" size={22} color={color} />
    )}}/>
    </Drawer.Navigator>   
)}

export default AutoStack

