import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AnimatedLoader from 'react-native-animated-loader';
import MapViewDirections from 'react-native-maps-directions';

const TrabajadorEnCamino = ({ navigation }) => {
  const trabajadorLocation = {
    latitude: -33.50670284242424,
    longitude: -70.75893506919192,
  };
  const clienteLocation = {
    latitude: -33.407494400000004,
    longitude: -70.55223794076082,
  };

  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      mapRef.current.fitToCoordinates([trabajadorLocation, clienteLocation], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: trabajadorLocation.latitude,
            longitude: trabajadorLocation.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          minZoomLevel={0}
          maxZoomLevel={20}
        >
          <Marker
            coordinate={trabajadorLocation}
            title="Trabajador"
            description="Av Maipú 2229"
          >
            <Image
              source={require('../../assets/images/trabajador.png')}
              style={{ width: 20, height: 20 }}
            />
          </Marker>
          <Marker
            coordinate={clienteLocation}
            title="Cliente"
            description="Apoquindo"
          >
            <Image
              source={require('../../assets/images/cliente.png')}
              style={{ width: 20, height: 20 }}
            />
          </Marker>
          <MapViewDirections
            origin={trabajadorLocation}
            destination={clienteLocation}
            apikey="TU_API_KEY_DE_GOOGLE_MAPS"
            strokeWidth={3}
            strokeColor="blue"
          />
        </MapView>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('CodigoQRTrabajador')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Destino</Text>
      </TouchableOpacity>

      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255, 255, 255, 0.75)"
        source={require('../../loader.json')}
        animationStyle={styles.loader}
        speed={1}
      />
      {loading && (
        <Text style={styles.loadingText}>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.7, // Controla la altura del mapa
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 10, // Coloca el botón en la parte inferior
    alignSelf: 'center', // Centra el botón horizontalmente
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  loader: {
    width: 200,
    height: 200,
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default TrabajadorEnCamino;
