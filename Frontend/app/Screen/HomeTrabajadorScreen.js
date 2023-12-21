import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from "./CustomDrawer"
import PerfilTrabajador from './PerfilTrabajador';
import SolicitudesTrabajador from './SolicitudesTrabajador'
import TrabajosProgreso from './TrabajosProgreso'
import Configuracion from "./Configuracion";
import Soporte from "./Soporte";
import axios from 'axios';
import TrabajosPendientes from './TrabajosPendientes';
import moment from 'moment-timezone';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    solicitudContainer: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
    },
    solicitudText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#6A0572', // Morado
    },
    botonAceptar: {
        backgroundColor: '#00BFFF',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    textoBotonAceptar: {
        color: 'white',
        fontWeight: 'bold',
    },
    fechaText: {
        fontStyle: 'italic',
        marginBottom: 5,
        color: '#FF6F61', // Cambié el color a un tono más visible (naranja-rojo)
    },
});

const HomeTrabajadorScreen = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

    useEffect(() => {
        axios.get("http://192.168.100.171:8000/api/auth/solicitudesMostrando")
            .then((response) => {
                const data = response.data.map((item) => ({
                    ...item,
                    fechaCreada: moment(item.fechaCreada).tz('America/Santiago').format('DD/MM/YYYY'),
                    // Ajusta los formatos según tus necesidades
                    fechaAceptada: moment(item.fechaAceptada).tz('America/Santiago').format('DD/MM/YYYY'),
                }));
                setSolicitudes(data);
            })
            .catch((error) => {
                console.error('Error al obtener las solicitudes:', error);
            });
    }, []);

    const handleAceptarSolicitud = (solicitudId) => {
        const trabajadorRUT = 'RUT_DEL_TRABAJADOR_ACTUAL';
    
        axios.put(`http://192.168.100.171:8000/api/auth/aceptar/${solicitudId}`, {
            trabajadorRUT: trabajadorRUT,
        })
            .then((response) => {
                const nuevasSolicitudes = solicitudes.filter((solicitud) => solicitud._id !== solicitudId);
                setSolicitudes(nuevasSolicitudes);
            })
            .catch((error) => {
                console.error('Error al aceptar la solicitud:', error);
            });
    };

    return (
        <View>
            <FlatList
                data={solicitudes}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.solicitudContainer}>
                        <Text style={styles.solicitudText}>{item.nameSolicitud}</Text>
                        <Text>Descripción: {item.descripcion}</Text>
                        <Text style={styles.fechaText}>Creada el: {item.fechaCreada}</Text>
                        <Text style={styles.fechaText}>Aceptada el: {item.fechaAceptada}</Text>
                        <Text>Fotos: {item.fotos}</Text>
                        {solicitudSeleccionada !== item._id && (
                            <TouchableOpacity onPress={() => setSolicitudSeleccionada(item._id)}>
                                <Text>Ver detalles</Text>
                            </TouchableOpacity>
                        )}
                        {solicitudSeleccionada === item._id && (
                            <TouchableOpacity onPress={() => handleAceptarSolicitud(item._id)}>
                                <View style={styles.botonAceptar}>
                                    <Text style={styles.textoBotonAceptar}>Aceptar</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

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


<Drawer.Screen name="Home" component={HomeTrabajadorScreen} options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="home-outline" size={22} color={color} />
)}}/>
<Drawer.Screen name="Solicitudes aceptadas" component={SolicitudesTrabajador}  options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="person-outline" size={22} color={color} />
)}}/>
    <Drawer.Screen name="Trabajos en progreso" component={TrabajosProgreso} options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="hammer" size={22} color={color} />
)}}/>
<Drawer.Screen name="Trabajos pendientes" component={TrabajosPendientes} options={{ drawerIcon: ({color}) =>( 
    <Ionicons name="hammer" size={22} color={color} />
)}}/>    
<Drawer.Screen name="Perfil" component={PerfilTrabajador} options={{ drawerIcon: ({color}) =>( 
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
