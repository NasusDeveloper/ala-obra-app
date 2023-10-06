import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

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
    },
    botonIniciarTrabajo: {
        backgroundColor: '#00BFFF',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    textoBotonIniciarTrabajo: {
        color: 'white',
        fontWeight: 'bold',
    },
});

const TrabajosPendientes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        // Realiza una solicitud GET al servidor para obtener las solicitudes pendientes
        axios.get("http://192.168.100.171:8000/api/auth/solicitudesPentiendesTrabajador")
            .then((response) => {
            setSolicitudes(response.data);
        })
            .catch((error) => {
            console.error('Error al obtener las solicitudes pendientes:', error);
        });
    }, []);

    const handleIniciarTrabajo = () => {
        // Redirige a la pantalla "TrabajadorEnCamino"
        navigation.navigate('TrabajadorEnCamino');
    }

    return (
        <View>
            <FlatList
                data={solicitudes}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.solicitudContainer}>
                    <Text style={styles.solicitudText}>{item.nameSolicitud}</Text>
                    <Text>{item.descripcion}</Text>
                    {solicitudSeleccionada !== item._id && (
                        <TouchableOpacity onPress={() => setSolicitudSeleccionada(item._id)}>
                        <Text>Ver detalles</Text>
                        </TouchableOpacity>
                    )}
                    {solicitudSeleccionada === item._id && (
                        <TouchableOpacity onPress={handleIniciarTrabajo}>
                            <View style={styles.botonIniciarTrabajo}>
                                <Text style={styles.textoBotonIniciarTrabajo}>Iniciar Trabajo</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    </View>
                )}
            />
        </View>
    );
};

export default TrabajosPendientes;
