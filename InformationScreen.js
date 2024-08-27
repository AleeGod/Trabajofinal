import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 

const InformationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <Image source={require('./assets/imagen1.jpg')} style={styles.image} />

      {/* Barra con íconos en la parte superior de la imagen */}
      <View style={styles.iconBar}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="eye-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    
      {/* Lista de categorías */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryItem}>
          <Ionicons name="star-outline" size={18} color="gold" />
          <Text style={styles.categoryText}>Atracciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Ionicons name="star-outline" size={18} color="gold" />
          <Text style={styles.categoryText}>De compras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Ionicons name="star-outline" size={18} color="gold" />
          <Text style={styles.categoryText}>Restaurantes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Ionicons name="star-outline" size={18} color="gold" />
          <Text style={styles.categoryText}>Bares & Entretenimiento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem}>
          <Ionicons name="star-outline" size={18} color="gold" />
          <Text style={styles.categoryText}>Hoteles</Text>
        </TouchableOpacity>
      </View>

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Ionicons name="book-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="navigate-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
          <Ionicons name="map-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300, 
    resizeMode: 'cover', 
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#00bc5e',
    position: 'absolute',
    top: 300, 
    width: '100%',
    zIndex: 1,
  },
  categoriesContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    zIndex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#00bc5e',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
});

export default InformationScreen;
