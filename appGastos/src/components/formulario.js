import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

export default function Formulario({ guardarDatos, datos = [], id = null }) { // Ajuste en los props para evitar errores

  const [gastos, setGastos] = useState({
    nombreGasto: "",
    costoGasto: "",
  });

  useEffect(() => {
    if (id !== null) {
      datos.map((i) => {
        if (i.id === id) { // Validar si el id coincide
          i.costoGasto = i.costoGasto.toString(); // Convertir el costo a string
          setGastos({ nombreGasto: i.nombreGasto, costoGasto: i.costoGasto });
        }
      });
    }
  }, [id]);

  const cambiarTexto = (nombre, value) => {
    setGastos({ ...gastos, [nombre]: value });
  };

  const enviarDatos = () => {
    if (!gastos.nombreGasto || !gastos.costoGasto || (gastos.costoGasto) <= 0) return;
    if (id === null) {
      gastos.id=uuid.v4(); // Generar ID único
      guardarDatos(nuevoGasto);
    } else {
      guardarDatos({gastos});
    }

    setGastos({ nombreGasto: "", costoGasto: "" }); // Limpiar formulario
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Añade tus gastos</Text>
      <TextInput
        style={styles.cajaTexto}
        onChangeText={(value) => cambiarTexto("nombreGasto", value)}
        placeholder="Nombre del gasto. Ej. Transporte"
        value={gastos.nombreGasto}
      />
      <TextInput
        style={styles.cajaTexto}
        onChangeText={(value) => cambiarTexto("costoGasto", value)}
        placeholder="Cantidad del gasto. Ej. 100"
        keyboardType="numeric"
        value={gastos.costoGasto}
      />
      <TouchableOpacity style={styles.boton} onPress={enviarDatos}>
        <Text style={styles.textoBoton}>Guardar Datos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cajaTexto: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
