import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const Configuracion = () => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [idiomaRTL, setIdiomaRTL] = useState(false);
  const [modoNocturno, setModoNocturno] = useState(false);
  const [tamañoFuente, setTamañoFuente] = useState(16); // Tamaño de fuente en puntos

  const handleToggleNotificaciones = () => {
    setNotificaciones((prevNotificaciones) => !prevNotificaciones);
  };

  const handleToggleIdiomaRTL = () => {
    setIdiomaRTL((prevIdiomaRTL) => !prevIdiomaRTL);
  };

  const handleToggleModoNocturno = () => {
    setModoNocturno((prevModoNocturno) => !prevModoNocturno);
  };

  const handleIncreaseFontSize = () => {
    setTamañoFuente((prevSize) => prevSize + 2);
  };

  const handleDecreaseFontSize = () => {
    setTamañoFuente((prevSize) => Math.max(prevSize - 2, 10)); // Evitar tamaños de fuente menores a 10
  };

  const handleGuardarConfiguracion = () => {
    // Aquí puedes guardar las configuraciones en tu base de datos o en el almacenamiento local
    // Por ahora, solo mostramos un mensaje para demostrar el guardado ficticio
    alert('Configuración guardada.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notificaciones</Text>
        <Switch
          value={notificaciones}
          onValueChange={handleToggleNotificaciones}
          thumbColor={notificaciones ? '#4CAF50' : '#BFBFBF'}
          trackColor={{ true: '#8BC34A', false: '#E0E0E0' }}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Idioma RTL (de derecha a izquierda)</Text>
        <Switch
          value={idiomaRTL}
          onValueChange={handleToggleIdiomaRTL}
          thumbColor={idiomaRTL ? '#4CAF50' : '#BFBFBF'}
          trackColor={{ true: '#8BC34A', false: '#E0E0E0' }}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Modo Nocturno</Text>
        <Switch
          value={modoNocturno}
          onValueChange={handleToggleModoNocturno}
          thumbColor={modoNocturno ? '#4CAF50' : '#BFBFBF'}
          trackColor={{ true: '#8BC34A', false: '#E0E0E0' }}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Tamaño de Fuente</Text>
        <TouchableOpacity onPress={handleDecreaseFontSize} style={styles.fontSizeButton}>
          <Text style={styles.fontSizeButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.fontSizeText}>{tamañoFuente} pts</Text>
        <TouchableOpacity onPress={handleIncreaseFontSize} style={styles.fontSizeButton}>
          <Text style={styles.fontSizeButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleGuardarConfiguracion}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: '#333',
  },
  fontSizeButton: {
    backgroundColor: '#8BC34A',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fontSizeText: {
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Configuracion;
