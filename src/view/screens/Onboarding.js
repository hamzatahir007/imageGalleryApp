import { View, Text, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const Tutorial = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.navigate('login')}
      onDone={() => navigation.navigate('login')}
      pages={[
        {
          backgroundColor: '#fff',
          titleStyles: {
            fontFamily: 'Poppins-SemiBold',
          },
          subTitleStyles: {
            fontFamily: 'Poppins-Regular',
          },
          image: (
            <Image source={require('../../assets/icons/add_your_info.png')} />
          ),
          title: 'Discover Images',
          subtitle:
            'Explore a wide collection of beautiful and high-quality images from around the world.',
        },
        {
          backgroundColor: '#fff',
          titleStyles: {
            fontFamily: 'Poppins-SemiBold',
          },
          subTitleStyles: {
            fontFamily: 'Poppins-Regular',
          },
          image: (
            <Image source={require('../../assets/icons/add_to_cart.png')} />
          ),
          title: 'Like & Save',
          subtitle:
            'Like your favorite images and keep them saved for quick access anytime.',
        },
        {
          backgroundColor: '#fff',
          titleStyles: {
            fontFamily: 'Poppins-SemiBold',
          },
          subTitleStyles: {
            fontFamily: 'Poppins-Regular',
          },
          image: <Image source={require('../../assets/icons/payment.png')} />,
          title: 'Share with Friends',
          subtitle:
            'Share amazing images with your friends and social networks بسهولة.',
        },
      ]}
    />
  );
};

export default Tutorial;
