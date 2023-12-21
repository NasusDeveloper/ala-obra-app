import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';

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
    fechaText: {
        fontStyle: 'italic',
        marginBottom: 5,
        color: '#FF6F61', // Naranja-rojo
    },
    descripcionText: {
        color: '#000', // Negro
        marginBottom: 5,
        },
});

const TrabajosPendientes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        axios.get("http://192.168.100.171:8000/api/auth/solicitudesPentiendesTrabajador")
            .then((response) => {
                const solicitudesData = response.data.map((solicitud) => ({
                    ...solicitud,
                    fechaCreada: moment.tz(solicitud.fechaCreada, 'America/Santiago').format('DD/MM/YYYY'),
                    fechaAceptada: moment.tz(solicitud.fechaAceptada, 'America/Santiago').format('DD/MM/YYYY'),
                }));
                setSolicitudes(solicitudesData);
            })
            .catch((error) => {
                console.error('Error al obtener las solicitudes pendientes:', error);
            });
    }, []);

    const handleIniciarTrabajo = async (solicitudId) => {
        try {
            await axios.put(`http://192.168.100.171:8000/api/auth/iniciarTrabajo/${solicitudId}`, {
                estado: 'en progreso',
            });

            const nuevasSolicitudes = solicitudes.filter((solicitud) => solicitud._id !== solicitudId);
            setSolicitudes(nuevasSolicitudes);
            navigation.navigate('TrabajadorEnCamino');
        } catch (error) {
            console.error('Error al iniciar el trabajo:', error);
        }
    };

    return (
        <View>
            <FlatList
                data={solicitudes}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.solicitudContainer}>
                        <Text style={styles.solicitudText}>{item.nameSolicitud}</Text>
                        <Text style={styles.descripcionText}>Descripción: {item.descripcion}</Text>
                        <Text style={styles.descripcionText}>Estado: {item.estado}</Text>
                        <Text style={styles.fechaText}>Creada el: {item.fechaCreada}</Text>
                        <Text style={styles.fechaText}>Aceptada el: {item.fechaAceptada}</Text>
                        <Text>Fotos: {item.fotos}</Text>
                        <Text>Trabajador a cargo: {item.trabajadorQueAcepta}</Text>
                        <Text></Text>
                        {solicitudSeleccionada !== item._id && (
                            <TouchableOpacity onPress={() => setSolicitudSeleccionada(item._id)}>
                                <Text>Ver detalles</Text>
                            </TouchableOpacity>
                        )}
                        {solicitudSeleccionada === item._id && (
                            <TouchableOpacity onPress={() => handleIniciarTrabajo(item._id)}>
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
