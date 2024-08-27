import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, Modal, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';// Importar iconos de Ionicons

import logoAgen from './assets/logoAgen.png'; 
import imagen1 from './assets/imagen1.jpg'; 
import imagen2 from './assets/imagen2.jpg';
import imagen3 from './assets/imagen3.jpg';
import InformationScreen from './InformationScreen';
import MapScreen from './MapScreen'; 

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  // Datos de las imágenes
  const imageData = [
    { id: '1', source: imagen1, label: 'Chiclayo' },
    { id: '2', source: imagen2, label: 'Lima' },
    { id: '3', source: imagen3, label: 'Lima' },
    { id: '4', source: imagen1, label: 'Chiclayo' },
    { id: '5', source: imagen2, label: 'Lima' },
    { id: '6', source: imagen3, label: 'Lima' },
    { id: '7', source: imagen1, label: 'Chiclayo' },
    { id: '8', source: imagen2, label: 'Lima' },
    { id: '9', source: imagen3, label: 'Lima' },
  ];

  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = React.useState(false);

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={styles.imageContainer}>
        <Image source={item.source} style={styles.image} />
        <Text style={styles.textOverlay}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Logo en la parte superior */}
      <Image source={logoAgen} style={styles.logo} />
      <StatusBar style="auto" />

      {/* Contenedor de Título y Íconos */}
      <View style={styles.headerContainer}>
        {/* Contenedor de Título y Fecha */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Chiclayo a Lima</Text>
          <Text style={styles.dateText}>Agosto 31 - Octubre 11</Text>
        </View>

        
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('InformationScreen')}>
            <Ionicons name="information-circle-outline" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <Ionicons name="document-text-outline" size={24} color="black" style={styles.icon} />
          <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
        </View>
      </View>

      {/* FlatList para mostrar las imágenes */}
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              "No se pudo completar la operación. Por favor, revisa los detalles y vuelve a intentarlo."
            </Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen name="InformationScreen" component={InformationScreen} options={{ title: 'Información' }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40, // Espacio superior para el logo
    
  },
  
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10, // Espacio entre el logo y el resto del contenido
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10, // Espacio entre el header y las imágenes
  },
  titleContainer: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5, // Espacio entre los iconos
  },
  listContent: {
    paddingHorizontal: 10, // Espacio horizontal para la lista
  },
  imageContainer: {
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10, // Bordes redondeados para las imágenes
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para el texto
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
