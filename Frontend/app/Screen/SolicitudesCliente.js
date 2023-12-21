import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';

const SolicitudesCliente = ({ clienteId }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('')

    useEffect(() => {
        const obtenerSolicitudesCliente = async () => {
            try {
                const response = await axios.get(`http://192.168.100.171:8000/api/auth/solicitudes/cliente/${clienteId}`, {
                    params: {
                        estado: filtroEstado
                    }
                });

                // Formatear las fechas a la zona horaria de Chile
                const solicitudesConFechaChilena = response.data.map((solicitud) => ({
                    ...solicitud,
                    fechaCreada: moment(solicitud.fechaCreada).tz('America/Santiago').format('DD/MM/YYYY'),
                    fechaAceptada: moment(solicitud.fechaAceptada).tz('America/Santiago').format('DD/MM/YYYY'),
                }));

                setSolicitudes(solicitudesConFechaChilena);
            } catch (error) {
                console.error('Error al obtener las solicitudes del cliente:', error);
            }
        };

        obtenerSolicitudesCliente();
    }, [clienteId, filtroEstado]);

    const renderItem = ({ item }) => (
        <View style={styles.solicitudContainer}>
            <Text style={styles.solicitudTitle}>{item.nameSolicitud}</Text>
            <Text>Estado: {item.estado}</Text>
            <Text>Trabajador designado: {item.trabajadorQueAcepta}</Text>
            <Text>Fotos: {item.fotos}</Text>
            <Text>Creada el: {item.fechaCreada}</Text>
            <Text>Aceptada el: {item.fechaAceptada}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={solicitudes}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                style={styles.flatList}
            />
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    solicitudContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    solicitudTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    flatList: {
        flexGrow: 1,
    },
});

export default SolicitudesCliente;
