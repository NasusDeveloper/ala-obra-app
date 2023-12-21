import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"



const Soporte = () => {
  const navigation = useNavigation()
  const [faqList, setFaqList] = useState([
    {
      question: '¿Cómo puedo realizar un pago?',
      answer: 'Para realizar un pago, dirígete a la sección de pagos en la pantalla principal y selecciona el método de pago deseado.',
    },
    {
      question: '¿Cuál es el tiempo de entrega?',
      answer: 'El tiempo de entrega puede variar dependiendo de la ubicación y el tipo de producto. Por lo general, el tiempo de entrega es de 3 a 5 días hábiles.',
    },
    {
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Para cambiar tu contraseña, ve a la pantalla de perfil, selecciona "Editar Perfil" y luego ingresa tu nueva contraseña.',
    },
  ]);

  const [selectedFaqIndex, setSelectedFaqIndex] = useState(null);

  const handleFaqSelect = (index) => {
    if (selectedFaqIndex === index) {
      setSelectedFaqIndex(null);
    } else {
      setSelectedFaqIndex(index);
    }
  };

  const handleContactSupport = () => {
    navigation.navigate('SolicitudSoporte');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Preguntas Frecuentes</Text>
      {faqList.map((faq, index) => (
        <TouchableOpacity key={index} onPress={() => handleFaqSelect(index)} style={styles.faqItem}>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          {selectedFaqIndex === index && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
        <Text style={styles.contactButtonText}>Contactar con Soporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  faqItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  faqAnswer: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Soporte
