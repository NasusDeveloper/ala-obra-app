import React, { useState } from "react";
import { View, TextInput, Button, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const FormularioSolicitud = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotos, setFotos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleNombreChange = (Text) => {
    setNombre(Text);
  };

  const handleDescripcionChange = (Text) => {
    setDescripcion(Text);
  };

  const handleFechaInicioChange = (Text) => {
    setFechaInicio(Text);
  };

  const handleFechaFinChange = (Text) => {
    setFechaFin(Text);
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
      maxNumberOfFiles: 5 - fotos.length,
    });

    if (!result.cancelled) {
      setFotos([...fotos, result.uri]);
    }
  };

  const handleFormSubmit = async () => {
    try {
      // Realizar la solicitud a través de Axios
      const response = await axios.post("http://192.168.100.171:8000/api/auth/solicitudes", {
        nombre,
        descripcion,
        fotos,
        fechaInicio,
        fechaFin,
      });

      // Procesar la respuesta del backend
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre (mínimo 10 caracteres)"
        onChangeText={handleNombreChange}
        value={nombre}
      />
      <TextInput
        placeholder="Descripción (máximo 100 caracteres)"
        onChangeText={handleDescripcionChange}
        value={descripcion}
        multiline
      />
      <Button title="Seleccionar Fotos" onPress={handleImageUpload} />
      <View>
        {fotos.map((foto, index) => (
          <Image key={index} source={{ uri: foto }} style={{ width: 200, height: 200 }} />
        ))}
      </View>
      <TextInput
        placeholder="Fecha de inicio"
        onChangeText={handleFechaInicioChange}
        value={fechaInicio}
      />
      <TextInput
        placeholder="Fecha de fin"
        onChangeText={handleFechaFinChange}
        value={fechaFin}
      />
      <TouchableOpacity onPress={handleFormSubmit}>
        <View>
          <Text>Enviar Solicitud</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FormularioSolicitud;
