import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import {products} from '../data/products';
import styles from '../styles';

export const ProductGrid = ({searchText, navigation}) => {
  const filtered = products.filter(x =>
    x.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View>
      <Text style={styles.searchText}>
        {filtered.length === 0 && 'no'} search results for "{searchText}"
      </Text>

      <ScrollView contentContainerStyle={styles.productGrid}>
        {filtered.map((x, i) => (
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
    </View>
  );
};
