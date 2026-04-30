import React, { useRef, useState, useEffect } from 'react';
import Carousel, {
  ParallaxImage,
  Pagination,
} from 'react-native-snap-carousel-v4';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import {products} from '../data/products';

const { width: screenWidth } = Dimensions.get('window');

export const ProductCarousel = ({navigation}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item}, parallaxProps) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('LikeDetailScreen', {product: item});
        }}
        style={styles.item}>
        <ParallaxImage
          source={{uri: item.imgs[0]}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />

        <View style={styles.details}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>
              {item.description.slice(0, 200)}...
            </Text>
          </View>

          <View style={styles.price}>
            <Text style={{fontSize: 16}}>${item.price}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
        data={products} // ✅ direct data
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 8,
    opacity: 0.75,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  details: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
  },

  detailsSelected: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
  },

  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  price: {
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
  },
});
