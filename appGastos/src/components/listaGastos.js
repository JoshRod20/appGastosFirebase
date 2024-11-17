import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function ListaGastos({ datos, eliminarGasto, cambiarId }) {
  return (
    <ScrollView style={styles.scroll}>
      {datos.map((i) => (
        <View key={i.id} style={styles.contenedor}>
          <Text style={styles.texto1}>{i.nombreGasto}</Text>
          <Text style={styles.texto2}>${i.costoGasto}</Text>
          <AntDesign
            onPress={() => eliminarGasto(i.id)}
            style={styles.iconoEliminar}
            name="delete"
            size={30}
            color="black"
          />
          <AntDesign
            onPress={() => cambiarId(i.id, i.costoGasto)}
            style={styles.iconoEditar}
            name="edit"
            size={30}
            color="black"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    marginTop: 20,
  },
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  texto1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  texto2: {
    fontSize: 14,
    color: '#666',
  },
  iconoEliminar: {
    marginLeft: 10,
  },
  iconoEditar: {
    marginLeft: 10,
  },
});
