import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  toggleLike,
  updateImageLikes,
  selectLikedImages,
  selectImages,
} from '../../consts/redux/reducers/gallerySlice';
import { LIKE_IMAGE } from '../../graphql/queries';
import COLORS from '../../consts/Colors';

const { width, height } = Dimensions.get('window');

const LikeDetailScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const dispatch = useDispatch();
  const likedImages = useSelector(selectLikedImages);
  const images = useSelector(selectImages);

  const currentImage = images.find(i => i.id === image.id) || image;
  const liked = likedImages.includes(image.id);

  const [likeImage] = useMutation(LIKE_IMAGE);

  const imgScale = useSharedValue(0.7);
  const imgOpacity = useSharedValue(0);

  useEffect(() => {
    imgScale.value = withSpring(1, { damping: 14, stiffness: 90 });
    imgOpacity.value = withTiming(1, { duration: 400 });
  }, []);

  const imgAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imgScale.value }],
    opacity: imgOpacity.value,
  }));

  const heartScale = useSharedValue(1);
  const heartColor = useSharedValue(liked ? 1 : 0);

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleLike = async () => {
    heartScale.value = withSequence(
      withSpring(1.5, { damping: 3 }),
      withSpring(1),
    );

    dispatch(toggleLike(image.id));
    const newLikes = liked ? currentImage.likes - 1 : currentImage.likes + 1;
    dispatch(updateImageLikes({ id: image.id, likes: newLikes }));

    try {
      await likeImage({ variables: { id: image.id, likes: newLikes } });
    } catch {
      dispatch(toggleLike(image.id));
      dispatch(updateImageLikes({ id: image.id, likes: currentImage.likes }));
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <Animated.Image
        source={{ uri: currentImage.image_url }}
        style={[styles.heroImage, imgAnimStyle]}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={18} color={COLORS.white} />
      </TouchableOpacity>

      <ScrollView
        style={styles.detailCard}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {currentImage.title}
          </Text>

          <TouchableOpacity onPress={handleLike}>
            <Animated.View
              style={[
                styles.likeCircle,
                heartAnimStyle,
                liked && styles.likeCircleActive,
              ]}
            >
              <Icon
                name={liked ? 'heart' : 'heart-o'}
                size={20}
                color={liked ? COLORS.white : COLORS.gray}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Text style={styles.author}>By: {currentImage.author}</Text>

        <View style={styles.likesRow}>
          <Icon name="heart" size={16} color="red" />
          <Text style={styles.likesCount}>
            {currentImage.likes} {currentImage.likes === 1 ? 'like' : 'likes'}
          </Text>
        </View>

        <Text style={styles.descLabel}>Description</Text>
        <Text style={styles.description}>
          {currentImage.description || 'No description available.'}
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default LikeDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heroImage: {
    width,
    height: height * 0.48,
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    marginRight: 12,
  },
  likeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  likeCircleActive: {
    backgroundColor: 'red',
  },
  author: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray,
    marginBottom: 10,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  likesCount: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
    marginLeft: 6,
  },
  descLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
    lineHeight: 22,
  },
});
