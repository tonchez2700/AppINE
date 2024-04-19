import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const ModalSearch = ({ onSearch }) => {

  const [empresa, setEmpresa] = useState("");
  const [encuesta, setEncuesta] = useState("");
  const [nombre, setNombre] = useState("");

  const handleSearch = () => {
    const filters = {
      empresa,
      encuesta,
      nombre,
    };
    onSearch(filters);
    onClose();
  };

  return (
    <View style={{ height: 190, width: 340 }}>
      <View style={{ marginTop: 14 }}>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.inputText}>EMPRESA</Text>
          <TextInput
            style={styles.filtercontainer}
            placeholder="EMPRESA"
            onChangeText={setEmpresa}
            value={empresa}
          />
        </View>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.inputText}>ENCUESTA</Text>
          <TextInput
            style={styles.filtercontainer}
            placeholder="Encuesta"
            onChangeText={setEncuesta}
            value={encuesta}
          />
        </View>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.inputText}>NOMBRE</Text>
          <TextInput
            style={styles.filtercontainer}
            placeholder="NOMBRE"
            onChangeText={setNombre}
            value={nombre}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filtercontainer: {
    height: 39,
    width: 259,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#00000026",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5, 
  },
  inputText: {
    fontSize: 14, 
    marginTop: 10, 
    justifyContent: "space-between"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#012B54",
    borderRadius: 5,
    height: 30,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ModalSearch;