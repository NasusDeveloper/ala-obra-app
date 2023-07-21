import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomDrawer from "./CustomDrawer"
import SolicitudScreen from './SolicitudScreen';
import Trabajando from "./Trabajando"; 
import PerfilCliente from "./PerfilCliente";
import Configuracion from "./Configuracion";
import Soporte from "./Soporte";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const trabajadoresData = [
  { id: '1', nombre: 'Juan', profesion: 'Plomero', precio: '$250000', foto: require('../../assets/images/plomero.jpg'), descripcion: 'Soy un plomero con experiencia en instalaciones y reparaciones.' },
  { id: '2', nombre: 'María', profesion: 'Electricista', precio: '$80000', foto: require('../../assets/images/electricista.jpg'), descripcion: 'Soy un Electricista con experiencia en instalaciones y reparaciones.' },
  { id: '3', nombre: 'Pedro', profesion: 'Carpintero', precio: '$55000', foto: require('../../assets/images/carpintero.jpg'), descripcion: 'Soy un Carpintero con experiencia en instalaciones y reparaciones.' },
  { id: '4', nombre: 'Ana', profesion: 'Pintor', precio: '$80000', foto: require('../../assets/images/pintor.jpg'), descripcion: 'Soy un Pintor con experiencia en instalaciones y reparaciones.' },
  { id: '5', nombre: 'Luis', profesion: 'Jardinero', precio: '$25000', foto: require('../../assets/images/jardinero.jpg'), descripcion: 'Soy un Jardinero con experiencia en instalaciones y reparaciones.' },
  { id: '6', nombre: 'Laura', profesion: 'Albañil', precio: '$350000', foto: require('../../assets/images/albanil.jpg'), descripcion: 'Soy un Albañil con experiencia en instalaciones y reparaciones.' },
  { id: '7', nombre: 'Carlos', profesion: 'Mecánico', precio: '$100000', foto: require('../../assets/images/mecanico.jpg'), descripcion: 'Soy un Mecanico con experiencia en instalaciones y reparaciones.' },
];

const profesionesData = [
  { id: '1', profesion: 'Todas' },
  { id: '2', profesion: 'Plomero' },
  { id: '3', profesion: 'Electricista' },
  { id: '4', profesion: 'Carpintero' },
  { id: '5', profesion: 'Pintor' },
  { id: '6', profesion: 'Jardinero' },
  { id: '7', profesion: 'Albañil' },
  { id: '8', profesion: 'Mecánico' },
];

const HomeScreen = () => {
  const [filtroProfesion, setFiltroProfesion] = useState(null);
  const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);

  const handleFiltrarProfesion = (profesion) => {
    setFiltroProfesion(profesion === filtroProfesion ? null : profesion);
    setTrabajadorSeleccionado(null); // Limpiar el trabajador seleccionado al cambiar de profesión
  };

  const handleMostrarDescripcion = (id) => {
    setTrabajadorSeleccionado(id === trabajadorSeleccionado ? null : id);
  };

  const renderFiltroItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filtroItem,
        filtroProfesion === item.profesion && styles.filtroItemSelected,
        item.profesion === 'Todas' && styles.filtroItemTodas,
      ]}
      onPress={() => handleFiltrarProfesion(item.profesion)}
    >
      <Text
        style={[
          styles.filtroItemText,
          filtroProfesion === item.profesion && styles.filtroItemTextSelected,
          item.profesion === 'Todas' && styles.filtroItemTextTodas,
        ]}
      >
        {item.profesion}
      </Text>
    </TouchableOpacity>
  );

  const trabajadoresFiltrados =
    filtroProfesion !== null
      ? trabajadoresData.filter((trabajador) => trabajador.profesion === filtroProfesion)
      : trabajadoresData;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleMostrarDescripcion(item.id)}>
      <Image source={item.foto} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text style={styles.cardProfesion}>{item.profesion}</Text>
      <Text style={styles.cardPrecio}>Precio: {item.precio}</Text>
      {trabajadorSeleccionado === item.id && (
        <Text style={styles.cardDescripcion}>{item.descripcion}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabajadores Disponibles</Text>
      <FlatList
        data={profesionesData}
        renderItem={renderFiltroItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtroContainer}
      />
      <FlatList
        data={trabajadoresFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardsContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cardsContainer: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardProfesion: {
    fontSize: 20,
    color: '#777',
    marginBottom: 4,
  },
  cardPrecio: {
    fontSize: 35,
    color: '#555',
  },
  filtroContainer: {
    marginBottom: 15,
  },
  filtroItem: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 5,
  },
  filtroItemText: {
    fontSize: 16,
    color: '#555',
  },
  filtroItemSelected: {
    backgroundColor: '#4CAF50',
  },
  filtroItemTodas: {
    paddingHorizontal: 10, // Ajustar el padding horizontal para 'Todas'
    paddingVertical: 4, // Ajustar el padding vertical para 'Todas'
    backgroundColor: '#4CAF50', // Color de fondo diferente para 'Todas'
  },
  filtroItemTextTodas: {
    color: '#FFF', // Color de texto diferente para 'Todas'
  },
  filtroItemTextSelected: {
    color: '#FFF',
  },
  cardDescripcion: {
    fontSize: 15,
    color: '#444',
    marginTop: 4,
  },
});

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
