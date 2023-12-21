import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';

const TrabajandoScreen = () => {
  const [solicitudesEnProgreso, setSolicitudesEnProgreso] = useState([]);

  useEffect(() => {
  // Realizar una solicitud GET al servidor para obtener las solicitudes en progreso
  axios.get('http://192.168.100.171:8000/api/auth/solicitudesEnProgreso')
      .then((response) => {
      const solicitudesFormateadas = response.data.map((solicitud) => ({
          ...solicitud,
        // Formatear las fechas a hora chilena
          fechaCreada: moment(solicitud.fechaCreada).tz('America/Santiago').format('DD/MM/YYYY'),
          fechaAceptada: moment(solicitud.fechaAceptada).tz('America/Santiago').format('DD/MM/YYYY'),
      }));
      setSolicitudesEnProgreso(solicitudesFormateadas);
      })
      .catch((error) => {
      console.error('Error al obtener las solicitudes en progreso:', error);
      });
}, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={solicitudesEnProgreso}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.solicitudContainer}>
            <Text style={styles.solicitudText}>{item.nameSolicitud}</Text>
            <Text style={styles.descripcionText}>Estado: {item.estado}</Text>
            <Text style={styles.descripcionText}>Descripción: {item.descripcion}</Text>
            <Text style={styles.fechaText}>Creada el: {item.fechaCreada}</Text>
            <Text style={styles.fechaText}>Aceptada el: {item.fechaAceptada}</Text>
            <Text style={styles.descripcionText}>Fotos: {item.fotos}</Text>
            <Text style={styles.descripcionText}>Trabajador a cargo: {item.trabajadorQueAcepta}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingHorizontal: 20,
  paddingTop: 20,
  },
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
  descripcionText: {
  color: '#000', // Negro
  marginBottom: 5,
  },
  fechaText: {
      fontStyle: 'italic',
      marginBottom: 5,
      color: '#FF6F61', // Cambié el color a un tono más visible (naranja-rojo)
  },
});

export default TrabajandoScreen;
