import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { View,Text } from "react-native"
import HomeScreen from "./HomeScreen"
import React from "react"
import SolicitudScreen from "./SolicitudScreen"


const Drawer = createDrawerNavigator ()

const TabScreen = () => {

    const navigation = useNavigation ()

    return (
    <Drawer.Navigator screenOptions={{headerStyle: {backgroundColor:'purple'}, headerTintColor:'white', drawerStyle:{backgroundColor:'#F0EDED'}}}>

    <Drawer.Screen name = "Home" component = {HomeScreen} options = {{headerTitle:'ALaObra', drawerActiveTintColor:'black', headerRight: () =>         
            
            //Cliqueable de iniciar sesion
            <TouchableWithoutFeedback onPress = { () => navigation.navigate('UserLogin')}>

            <Text style = {{color:'white', fontSize: 18, paddingRight: 20, fontWeight:'bold'}}>Iniciar Sesion</Text>
            
            </TouchableWithoutFeedback>}}/>

            <Drawer.Screen name="Solicitud" component={SolicitudScreen} options={{headerTitle:"Crear solicitud", drawerActiveTintColor:"black"}}/>

     </Drawer.Navigator>

    )
}

export default TabScreen