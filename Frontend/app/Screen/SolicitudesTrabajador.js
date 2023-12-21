import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Linking } from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';

const obtenerRUTDelTrabajador = () => {
    // Lógica para obtener el RUT del trabajador actual
    return 'RUT_DEL_TRABAJADOR_ACTUAL';
};

const SolicitudesCliente = () => {
    const [solicitudesAceptadas, setSolicitudesAceptadas] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const obtenerSolicitudesAceptadas = async () => {
            try {
                const trabajadorRUT = obtenerRUTDelTrabajador();
                const response = await axios.get(`http://192.168.100.171:8000/api/auth/solicitudes/${trabajadorRUT}`);
                const solicitudes = response.data
                    .filter((solicitud) => solicitud.estado === 'aceptada') // Filtrar por estado "aceptada"
                    .map((solicitud) => ({
                        ...solicitud,
                        fechaCreada: moment(solicitud.fechaCreada).tz('America/Santiago').format('DD/MM/YYYY'),
                        fechaAceptada: moment(solicitud.fechaAceptada).tz('America/Santiago').format('DD/MM/YYYY'),
                    }));
                setSolicitudesAceptadas(solicitudes);
            } catch (error) {
                console.error('Error al obtener las solicitudes aceptadas:', error);
            }
        };

        obtenerSolicitudesAceptadas();
    }, []);

    const handleContactarCliente = () => {
        // Número de WhatsApp del cliente
        const numeroCliente = '+56987616774';

        // URL de WhatsApp con el número del cliente
        const urlWhatsapp = `whatsapp://send?phone=${numeroCliente}`;

        // Abre WhatsApp con el número del cliente
        Linking.openURL(urlWhatsapp)
            .then((data) => {
                console.log('WhatsApp abierto:', data);
            })
            .catch((error) => {
                console.error('Error al abrir WhatsApp:', error);
            });
    };

    const handlePosponerSolicitud = async (solicitudId) => {
        try {
            await axios.put(`http://192.168.100.171:8000/api/auth/posponer/${solicitudId}`, {
                estado: 'pendiente de inicio',
            });

            const nuevasSolicitudes = solicitudesAceptadas.filter((solicitud) => solicitud._id !== solicitudId);
            setSolicitudesAceptadas(nuevasSolicitudes);
        } catch (error) {
            console.error('Error al posponer la solicitud:', error);
        }
    };

    const handleIniciarTrabajo = async (solicitudId) => {
        try {
            await axios.put(`http://192.168.100.171:8000/api/auth/iniciarTrabajo/${solicitudId}`, {
                estado: 'en progreso',
            });

            const nuevasSolicitudes = solicitudesAceptadas.filter((solicitud) => solicitud._id !== solicitudId);
            setSolicitudesAceptadas(nuevasSolicitudes);
            navigation.navigate('TrabajadorEnCamino');
        } catch (error) {
            console.error('Error al iniciar el trabajo:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
        },
        solicitudContainer: {
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingBottom: 10,
        },
        solicitudTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
            color: '#6A0572', // Morado
        },
        fechaText: {
            fontStyle: 'italic',
            marginBottom: 5,
            color: '#FBBF24', // Amarillo
        },
        descripcionText: {
            marginBottom: 5,
            color: '#000', // Negro
        },
        fotosText: {
            color: 'blue',
            textDecorationLine: 'underline',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
        },
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={solicitudesAceptadas}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.solicitudContainer}>
                        {item && item._id && (
                            <View>
                                <Text style={styles.solicitudTitle}>{item.nameSolicitud}</Text>
                                <Text>Estado: {item.estado}</Text>
                                <Text style={styles.fechaText}>Creada el: {item.fechaCreada}</Text>
                                <Text style={styles.fechaText}>Aceptada el: {item.fechaAceptada}</Text>
                                <Text style={styles.descripcionText}>Descripción: {item.descripcion}</Text>
                                <Text style={styles.fotosText}>Fotos: {item.fotos}</Text>
                                <View style={styles.buttonContainer}>
                                    <Button title="Posponer" onPress={() => handlePosponerSolicitud(item._id)} />
                                    <Button title="Iniciar trabajo" onPress={() => handleIniciarTrabajo(item._id)} />
                                    <Button title="Contactar" onPress={handleContactarCliente} />
                                </View>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

export default SolicitudesCliente;
