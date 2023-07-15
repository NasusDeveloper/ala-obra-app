import React from "react"
import "react-native-gesture-handler"

import { Text, View } from "react-native";
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from "./CustomDrawer"
import SolicitudScreen from './SolicitudScreen'
import Trabajando from "./Trabajando"
import MetodoPago from "./MetodoPago"
import PerfilCliente from "./PerfilCliente"
import Configuracion from "./Configuracion"
import Soporte from "./Soporte"

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Homme cliente</Text>
    </View>
)}

const DrawerNavigator = () => { 
  return(
    <Drawer.Navigator 
  drawerContent={props => <CustomDrawer{...props}/>} 

  screenOptions={{
  headerShown : true, 
  headerStyle: {backgroundColor:'#8200d6'},headerTintColor:'white', 
  drawerActiveBackgroundColor: '#aa18ea',
  drawerActiveTintColor: '#fff',
  drawerInactiveTintColor: '#333',
  drawerLabelStyle: {
  marginLeft: -25,
  fontSize: 15,
  }}}>


  <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="home-outline" size={22} color={color} />
  )}}/>
  <Drawer.Screen name="Solicitudes" component={SolicitudScreen}  options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="person-outline" size={22} color={color} />
  )}}/>
    <Drawer.Screen name="Trabajando" component={Trabajando} options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="hammer" size={22} color={color} />
  )}}/>  
  <Drawer.Screen name="Métodos de pago" component={MetodoPago} options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="card" size={22} color={color} />
  )}}/>  
  <Drawer.Screen name="Perfil" component={PerfilCliente} options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="person" size={22} color={color} />
  )}}/>
  <Drawer.Screen name="Configuración" component={Configuracion} options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="cog" size={22} color={color} />
  )}}/>
  <Drawer.Screen name="Soporte" component={Soporte} options={{ drawerIcon: ({color}) =>( 
  <Ionicons name="build" size={22} color={color} />
  )}}/>

  
  
    </Drawer.Navigator>   
  )
}
  
export default DrawerNavigator;
