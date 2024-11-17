import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { collection, doc, setDoc, deleteDoc, updateDoc, query, getDocs } from "firebase/firestore";
import { db } from './src/services/firebase';
import Formulario from './src/components/formulario';
import ListaGastos from './src/components/listaGastos';
import { useEffect, useState } from 'react';

export default function App() {
  const [datos, setDatos] = useState([]);
  const [id, setId] = useState(null);
  const [presu, setPresu] = useState(100);
  const [costoEdit, setCostoEdit] = useState(0);

  useEffect(() => {
    recibirDatos();
    obtenerSuma();
  }, [datos]);

  const recibirDatos = async () => {
    try {
      const q = query(collection(db, "Gastos"));
      const querySnapshot = await getDocs(q);
      const d = [];
      querySnapshot.forEach((doc) => {
        const datosDB = { ...doc.data(), id: doc.id }; // Incluir ID para manejarlo en la lista
        d.push(datosDB);
      });
      setDatos(d);
    } catch (error) {
      console.error("Error al recibir datos:", error);
    }
  };

  const guardarNuevoGasto = async (nuevoGasto) => {
    nuevoGasto.costoGasto = parseInt(nuevoGasto.costoGasto); // Asegurarse de que sea un número entero
    if (id === null) {
      // Nuevo gasto
      if (presu - nuevoGasto.costoGasto >= 0) {
        await setDoc(doc(db, "Gastos", nuevoGasto.id), nuevoGasto);
      } else {
        alert("Saldo insuficiente");
      }
    } else {
      // Editar gasto
      if (presu + costoEdit - nuevoGasto.costoGasto >= 0) {
        const datoRef = doc(db, "Gastos", id);
        await updateDoc(datoRef, {
          nombreGasto: nuevoGasto.nombreGasto,
          costoGasto: nuevoGasto.costoGasto,
        });
      } else {
        alert("Saldo insuficiente");
      }
    }
    setId(null); // Limpiar el estado después de guardar/editar
  };
  

  const eliminarGasto = async (id) => {
    try {
      await deleteDoc(doc(db, "Gastos", id));
      console.log("Gasto eliminado:", id);
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
    }
  };

  const obtenerSuma = () => {
    const totalGasto = datos.reduce((accumulator, item) => {
      return accumulator + (Number(item.costoGasto) || 0); // Asegurar que el costo sea un número
    }, 0);
    setPresu(100 - totalGasto);
  };

  const cambiarId = (id, costo) => {
    setId(id);
    setCostoEdit(costo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Gastos</Text>
      <Formulario
        guardarDatos={guardarNuevoGasto}
        id={id}
        datos={datos}
        texto={id === null ? "Guardar Datos" : "Editar Datos"}
      />
      <View style={styles.contenedorLista}>
        <ListaGastos
          datos={datos}
          eliminarGasto={eliminarGasto}
          cambiarId={cambiarId}
        />
      <Text>Presupuesto restante: ${presu.toFixed(2)}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contenedorLista: {
    flex: 1,
    width: '100%',
  },
});
