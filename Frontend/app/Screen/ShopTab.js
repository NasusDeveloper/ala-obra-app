import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View,Text } from "react-native";
import HomeScreen from "./shop/HomeScreen";
import React from "react";


const Drawer = createDrawerNavigator();
const ShopTab = () =>{
    const navigation = useNavigation();
    return(
    <Drawer.Navigator screenOptions={{headerStyle: {backgroundColor:'purple'}
    ,headerTintColor:'white', drawerStyle:{backgroundColor:'#F0EDED'}}}>
        
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerTitle:'ALaObra', drawerActiveTintColor:'black'
    , headerRight:()=><TouchableWithoutFeedback onPress={()=>navigation.navigate('UserLogin')}>
    <Text style={{color:'white', fontSize: 18, paddingRight: 20, fontWeight:'bold'}}>Iniciar Sesion</Text>
    </TouchableWithoutFeedback>}}/>

    </Drawer.Navigator>
    )
    }
    export default ShopTab