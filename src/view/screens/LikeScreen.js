import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  selectImages,
  selectLikedImages,
} from '../../consts/redux/reducers/gallerySlice';
import COLORS from '../../consts/Colors';

const { width } = Dimensions.get('window');

const LikeScreen = ({ navigation }) => {
  const images = useSelector(selectImages);
  const likedImages = useSelector(selectLikedImages);

  const liked = images.filter(img => likedImages.includes(img.id));

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Liked Images</Text>

      {liked.length === 0 ? (
        <View style={styles.empty}>
          <Icon name="heart-o" size={60} color={COLORS.gray2} />
          <Text style={styles.emptyText}>No liked images yet</Text>
        </View>
      ) : (
        <FlatList
          data={liked}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('LikeDetailScreen', { image: item })
              }
            >
              <Image source={{ uri: item.image_url }} style={styles.thumb} />
              <View style={styles.rowInfo}>
                <Text style={styles.rowTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.rowAuthor}>by {item.author}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}
                >
                  <Icon name="heart" size={13} color="red" />
                  <Text
                    style={{ fontSize: 12, marginLeft: 4, color: COLORS.gray }}
                  >
                    {item.likes}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  thumb: {
    width: 90,
    height: 90,
  },
  rowInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
  },
  rowAuthor: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
});
