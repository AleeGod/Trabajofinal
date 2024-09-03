import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import logoAgen from "./assets/logoAgen.png";
import imagen1 from "./assets/imagen1.jpg";
import imagen2 from "./assets/imagen2.jpg";
import imagen3 from "./assets/imagen3.jpg";
import InformationScreen from "./InformationScreen";
import MapScreen from "./MapScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  // Datos de las imágenes
  const imageData = [
    { id: "chiclayo", source: imagen1, label: "Chiclayo" },
    { id: "lima", source: imagen2, label: "Lima" },
    { id: "lima", source: imagen3, label: "Lima" },
    { id: "lima", source: imagen1, label: "Chiclayo" },
    { id: "lima", source: imagen2, label: "Lima" },
    { id: "lima", source: imagen3, label: "Lima" },
    { id: "lima", source: imagen1, label: "Chiclayo" },
    { id: "lima", source: imagen2, label: "Lima" },
    { id: "lima", source: imagen3, label: "Lima" },
  ];

  // Estados para el modal y los datos de la API
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Función para manejar la apertura del modal y la carga de datos
  const handlePress = async (item) => {
    setLoading(true);
    setModalVisible(true);

    try {
      // Aquí se haría la llamada a la API, asumiendo que 'id' es el parámetro necesario.
      const baseUrl = "https://www.meteosource.com/api/v1/free/point";
      const params = {
        place_id: item.id,
        sections: "all",
        timezone: "UTC",
        language: "en",
        units: "metric",
        key: "rtapw9gj1a6mhbhu5x8x7owpl4ybhzfppecuwjvj",
      };
      const queryString = new URLSearchParams(params).toString();
      const url = `${baseUrl}?${queryString}`;
      const response = await fetch(url);
      const data = await response.json();
      setModalData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Chiclayo a Lima</Text>
          <Text style={styles.dateText}>Agosto 31 - Octubre 11</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("InformationScreen")}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Ionicons
            name="document-text-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Ionicons
            name="settings-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
      </View>

      {/* FlatList para mostrar las imágenes */}
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                {modalData ? (
                  <>
                    <Text style={styles.modalText}>
                      Clima: {modalData.hourly.data[0].weather}
                    </Text>
                    <Text style={styles.modalText}>
                      Fecha Actual: {modalData.daily.data[0].day}
                    </Text>
                    <Text style={styles.modalText}>
                      Temperatura: {modalData.current.temperature}
                    </Text>
                    <Text style={styles.modalText}>
                      Viento: {modalData.current.wind.speed}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.modalText}>
                    No se pudo cargar la información.
                  </Text>
                )}
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </>
            )}
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="InformationScreen"
          component={InformationScreen}
          options={{ title: "Información" }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: "Map" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "column",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 5,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
