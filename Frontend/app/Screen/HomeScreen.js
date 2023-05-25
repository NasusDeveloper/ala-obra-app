import React from 'react';
import { View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SolicitudScreen from './solicitudScreen';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="SolicitudScreen" component={SolicitudScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
