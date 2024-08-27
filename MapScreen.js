import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      {/* Imagen de mapa */}
      <Image
        source={require('./assets/map-image.jpg')} 
        style={styles.map}
        resizeMode="cover"
      />

      {/* Barra de búsqueda y menú */}
      <View style={styles.header}>
        <Icon name="search" type="font-awesome" color="#000" />
        <Icon name="menu" type="font-awesome" color="#000" />
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.footer}>
        <Icon name="book" type="font-awesome" color="#fff" />
        <Icon name="link" type="font-awesome" color="#fff" />
        <Icon name="map" type="font-awesome" color="#fff" />
        <Icon name="camera" type="font-awesome" color="#fff" />
        <Icon name="ellipsis-h" type="font-awesome" color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#00bc5e',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MapScreen;
