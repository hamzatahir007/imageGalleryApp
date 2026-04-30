import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../styles';

import {products} from '../data/products';

export const ProductSlider = ({navigation}) => {
  return (
    <ScrollView horizontal style={styles.productSlider}>
      {products.slice(0, 6).map((x, i) => (
        <Pressable
          onPress={() => {
            navigation.navigate('LikeDetailScreen', {product: x});
          }}
          key={i}
          style={styles.sliderItem}>
          <Image style={styles.sliderImg} source={{uri: x.imgs[0]}} />
          <Text style={styles.sliderText}>{x.name}</Text>
          <Text style={styles.sliderPrice}>${x.price}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
