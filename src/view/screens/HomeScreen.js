import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  setImages,
  setLoading,
  setError,
  toggleLike,
  updateImageLikes,
  selectImages,
  selectLikedImages,
  selectLoading,
  selectError,
} from '../../consts/redux/reducers/gallerySlice';
import { GET_IMAGES, LIKE_IMAGE } from '../../graphql/queries';
import COLORS from '../../consts/Colors';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 36) / 2;

const HeartBurst = ({ visible }) => {
  const scale = useSharedValue(visible ? 1 : 0);
  const opacity = useSharedValue(visible ? 1 : 0);

  React.useEffect(() => {
    if (visible) {
      scale.value = withSequence(withSpring(1.6), withSpring(1));
      opacity.value = withSequence(
        withTiming(1),
        withTiming(0, { duration: 600 }),
      );
    }
  }, [visible]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  return (
    <Animated.View style={style} pointerEvents="none">
      <Icon name="heart" size={40} color="red" />
    </Animated.View>
  );
};

const ImageCard = React.memo(({ item, liked, onLike, onPress }) => {
  const heartScale = useSharedValue(1);
  const [showBurst, setShowBurst] = React.useState(false);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleLike = () => {
    heartScale.value = withSequence(
      withSpring(1.4, { damping: 4 }),
      withSpring(1),
    );

    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 700);

    onLike(item);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress(item)}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <HeartBurst visible={showBurst} />
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardAuthor} numberOfLines={1}>
          by {item.author}
        </Text>

        <View style={styles.cardBottom}>
          <TouchableOpacity
            onPress={handleLike}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Animated.View style={[styles.likeBtn, heartStyle]}>
              <Icon
                name={liked ? 'heart' : 'heart-o'}
                size={16}
                color={liked ? 'red' : COLORS.gray}
              />
              <Text style={[styles.likesText, liked && { color: 'red' }]}>
                {' '}
                {item.likes}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const likedImages = useSelector(selectLikedImages);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const { refetch } = useQuery(GET_IMAGES, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      dispatch(setImages(data.images));
      dispatch(setLoading(false));
    },
    onError: err => {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    },
  });

  const [likeImage] = useMutation(LIKE_IMAGE);

  const onRefresh = useCallback(() => {
    dispatch(setLoading(true));
    refetch();
  }, []);

  const handleLike = async image => {
    dispatch(toggleLike(image.id));
    const alreadyLiked = likedImages.includes(image.id);
    const newLikes = alreadyLiked ? image.likes - 1 : image.likes + 1;

    dispatch(updateImageLikes({ id: image.id, likes: newLikes }));

    try {
      await likeImage({ variables: { id: image.id, likes: newLikes } });
    } catch (e) {
      dispatch(toggleLike(image.id));
      dispatch(updateImageLikes({ id: image.id, likes: image.likes }));
    }
  };

  const handlePress = image => {
    navigation.navigate('LikeDetailScreen', { image });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: COLORS.red }}>Failed to load images.</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.retryBtn}>
          <Text style={{ color: COLORS.white }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={COLORS.dark} barStyle="light-content" />
      <Text style={styles.header}>Image Gallery</Text>

      <FlatList
        data={images}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[COLORS.main]}
          />
        }
        renderItem={({ item }) => (
          <ImageCard
            item={item}
            liked={likedImages.includes(item.id)}
            onLike={handleLike}
            onPress={handlePress}
          />
        )}
        ListEmptyComponent={
          !loading && (
            <View style={styles.centered}>
              <Text style={{ color: COLORS.gray }}>No images found.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    width: CARD_SIZE,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardImage: {
    width: '100%',
    height: CARD_SIZE,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  cardInfo: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
  },
  cardAuthor: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  retryBtn: {
    marginTop: 12,
    backgroundColor: COLORS.main,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
