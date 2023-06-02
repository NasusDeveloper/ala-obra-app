import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



const CustomDrawer = (props) => {

  const navigation = useNavigation()
  return (
    
    <View style={{flex:1}} >
    <DrawerContentScrollView {...props} 
    contentContainerStyle={{backgroundColor:'#8200d6' }}>
    <ImageBackground source={require("../../././assets/images/menu-bg.jpeg")}
    style={{padding: 20}}>
        
    <Image source={require('../../././assets/images/user-profile.png')} 
    style={{height: 80, width:80, borderRadius: 40, marginBottom: 10}}/>
      
      <View>
        <Text style={{ color:"#fff", fontSize: 18, marginBottom:5}}>Nombre</Text>
        <Text style={{ color:"#fff"}}>Trabajador o Cliente</Text>
      </View>

      </ImageBackground>
    <View style={{flex:1, backgroundColor:"#fff", paddingTop:10 }}>
    <DrawerItemList{...props} />
    </View>
    
    </DrawerContentScrollView>
    
    <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableWithoutFeedback onPress={() => {navigation.navigate('UserLoginScreen')}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

    </View>
  )
}

export default CustomDrawer