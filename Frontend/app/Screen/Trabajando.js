import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const TrabajandoScreen = () => {
  const [workInProgress, setWorkInProgress] = useState(true);

  const handleToggleStatus = () => {
    setWorkInProgress((prevStatus) => !prevStatus);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleToggleStatus}
          style={[styles.tab, workInProgress ? styles.activeTab : null]}
        >
          <Text style={styles.tabText}>En Progreso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleStatus}
          style={[styles.tab, !workInProgress ? styles.activeTab : null]}
        >
          <Text style={styles.tabText}>Listo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/trabajo.jpg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          {workInProgress
            ? 'Trabajo en progreso...'
            : 'Trabajo completado. ¡Listo!'}
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/trabajo.jpg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          {workInProgress
            ? 'Trabajo en progreso...'
            : 'Trabajo completado. ¡Listo!'}
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/trabajo.jpg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          {workInProgress
            ? 'Trabajo en progreso...'
            : 'Trabajo completado. ¡Listo!'}
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/trabajo.jpg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          {workInProgress
            ? 'Trabajo en progreso...'
            : 'Trabajo completado. ¡Listo!'}
        </Text>
      </View>

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/trabajo.jpg')}
          style={styles.image}
        />
        <Text style={styles.description}>
          {workInProgress
            ? 'Trabajo en progreso...'
            : 'Trabajo completado. ¡Listo!'}
        </Text>
      </View>

      {workInProgress && (
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: '50%', // Aquí puedes ajustar el porcentaje de progreso
  },
});

export default TrabajandoScreen;
