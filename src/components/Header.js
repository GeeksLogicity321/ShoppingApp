import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import colors from '../constants/colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {fontsFamily, fontsSize} from '../constants/fonts';
import {useSelector} from 'react-redux';

const Header = ({
  title,
  onLeftPress,
  onRightPress,
  isCart = false,
  isBack = false,
  isRightIcon = true,
  isLeftIcon = true,
  leftTitle = false,
}) => {
  const cartData = useSelector(state => state.cart);
  return (
    <View style={styles.container}>
      {isLeftIcon && (
        <Pressable onPress={onLeftPress} style={styles.left}>
          {!isBack ? (
            <SimpleLineIcons
              name={'menu'}
              size={RFPercentage(2.5)}
              color={'grey'}
            />
          ) : (
            <MaterialIcons
              name={'arrow-back-ios'}
              size={RFPercentage(2.5)}
              color={'grey'}
            />
          )}
          {leftTitle && <Text style={styles.leftTitle}>{leftTitle}</Text>}
        </Pressable>
      )}
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {isRightIcon && (
        <Pressable onPress={onRightPress}>
          {isCart && cartData.length > 0 && (
            <View style={styles.badgeCount}>
              <Text style={styles.count}>{cartData.length}</Text>
            </View>
          )}
          {!isCart ? (
            <Feather name="search" size={RFPercentage(2.5)} color={'grey'} />
          ) : (
            <MaterialCommunityIcons
              name="cart"
              size={RFPercentage(2.5)}
              color={'grey'}
            />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: heightPercentageToDP(6),
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: widthPercentageToDP(3),
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md2,
    width: widthPercentageToDP(70),
    color: colors.primary,
  },
  leftTitle: {
    textAlign: 'left',
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.lg2,
    width: widthPercentageToDP(70),
    color: 'grey',
  },
  badgeCount: {
    backgroundColor: 'red',
    width: widthPercentageToDP(4.5),
    height: widthPercentageToDP(4.5),
    position: 'absolute',
    zIndex: 1000,
    top: heightPercentageToDP(-1),
    right: widthPercentageToDP(-1.5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.sm1,
    color: 'white',
  },
});
