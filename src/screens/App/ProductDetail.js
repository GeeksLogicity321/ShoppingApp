import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import colors from '../../constants/colors';
import Header from '../../components/Header';
import DividerHorizontal from '../../components/DividerHorizontal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Images from '../../assets/images/index';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import {setLoader} from '../../redux/globalSlice';
const {width, height} = Dimensions.get('window');

const static_sizes = ['Small', 'Medium', 'large', 'Extra Large'];
const static_colors = [
  'Red',
  'Blue',
  'Orange',
  'Purple',
  'Green',
  'white',
  'Black',
  'Magenta',
];

const ProductDetail = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data} = props.route.params;
  const [selectSize, setSelectSize] = useState(static_sizes[0]);
  const [selectColor, setSelectColor] = useState(static_colors[0]);
  const [quantity, setQuantity] = useState(1);

  const onAddToCart = () => {
    dispatch(setLoader(true));
    dispatch(
      addToCart({
        ...data,
        qty: quantity,
        attributes: {
          color: selectColor ? selectColor : '',
          size: selectSize ? selectSize : '',
        },
      }),
    );
    setTimeout(() => {
      dispatch(setLoader(false));
      navigation.goBack();
    }, 1000);
  };
  const plusQty = () => {
    setQuantity(quantity + 1);
  };
  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderBanner = useCallback(
    ({item}) => {
      return (
        <View style={styles.banner}>
          <Image
            resizeMode="stretch"
            style={styles.bannerImage}
            source={{uri: item}}
          />
        </View>
      );
    },
    [data],
  );
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{paddingBottom: height * 0.09}}>
            <Header
              isBack
              isCart
              onLeftPress={() => navigation.goBack()}
              onRightPress={() =>
                navigation.navigate('Cart', {from: 'ProductDetail'})
              }
            />
            <View>
              <View style={styles.bannerContainer}>
                {data.images && data.images.length > 0 ? (
                  <Carousel
                    autoplay
                    loop={5}
                    layout="stack"
                    data={data.images}
                    renderItem={renderBanner}
                    sliderWidth={widthPercentageToDP(93)}
                    itemWidth={widthPercentageToDP(93)}
                  />
                ) : (
                  <Image
                    source={Images.Dummy}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{data?.title}</Text>
                <Text style={styles.description}>{data?.description}</Text>
                <Text
                  style={
                    styles.price
                  }>{`${constant.currency}. ${data?.price}`}</Text>
              </View>
              <DividerHorizontal w="90%" />
              <View style={styles.attributesContainer}>
                <View style={styles.attributesBox}>
                  <Text style={styles.attributesTitle}>Sizes</Text>
                  <View style={styles.innerBox}>
                    {static_sizes.map(item => {
                      return (
                        <Pressable
                          onPress={() => setSelectSize(item)}
                          style={[
                            styles.selectAttributes,
                            {
                              backgroundColor:
                                selectSize === item ? colors.primary : 'white',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.attributesText,
                              {
                                color:
                                  selectSize === item
                                    ? 'white'
                                    : colors.textLight,
                              },
                            ]}>
                            {item}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.attributesBox}>
                  <Text style={styles.attributesTitle}>Colors</Text>
                  <View style={styles.innerBox}>
                    {static_colors.map(item => {
                      return (
                        <Pressable
                          onPress={() => setSelectColor(item)}
                          style={[
                            styles.selectAttributes,
                            {
                              backgroundColor:
                                selectColor === item ? colors.primary : 'white',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.attributesText,
                              {
                                color:
                                  selectColor === item
                                    ? 'white'
                                    : colors.textLight,
                              },
                            ]}>
                            {item}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => minusQty()}
          style={[styles.qtyButton, styles.shadow]}>
          <FontAwesome5
            name={'minus'}
            size={RFPercentage(2.5)}
            color={'white'}
          />
        </Pressable>
        <Pressable
          onPress={() => onAddToCart()}
          style={[styles.addToCartButton, styles.shadow]}>
          <Text style={styles.addToCartText}>Add To Cart x {quantity}</Text>
        </Pressable>
        <Pressable
          onPress={() => plusQty()}
          style={[styles.qtyButton, styles.shadow]}>
          <FontAwesome5
            name={'plus'}
            size={RFPercentage(2.5)}
            color={'white'}
          />
        </Pressable>
      </View>
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: heightPercentageToDP(28),

    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  banner: {
    width: widthPercentageToDP(100),
    backgroundColor: 'white',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: widthPercentageToDP(6),
    marginTop: heightPercentageToDP(3),
  },
  title: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg1,
    textTransform: 'uppercase',
    color: colors.textDark,
  },
  description: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.sm2,
    textTransform: 'uppercase',
    color: colors.textLight,
    marginTop: heightPercentageToDP(0.5),
  },
  price: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.textDark,
    marginTop: heightPercentageToDP(2.5),
  },
  attributesContainer: {
    marginTop: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(6),
  },
  attributesBox: {
    width: widthPercentageToDP(90),
    alignItems: 'flex-start',
    marginTop: heightPercentageToDP(1.5),
    marginBottom: heightPercentageToDP(1),
  },
  attributesTitle: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    color: colors.textDark,
  },
  innerBox: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(0.5),
    flexWrap: 'wrap',
  },
  selectAttributes: {
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: widthPercentageToDP(2),
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: colors.primary,
    marginRight: widthPercentageToDP(2),
    marginTop: heightPercentageToDP(1),
  },
  attributesText: {
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.md1,
    color: colors.textLight,
  },
  qtyButton: {
    backgroundColor: '#bbbbbb',
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPercentageToDP(1),
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
  },
  bottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: heightPercentageToDP(4),
    paddingTop: heightPercentageToDP(1),
  },
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(60),
    height: widthPercentageToDP(10),
    borderRadius: widthPercentageToDP(1),
  },
  addToCartText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: fontsFamily.bold,
    fontSize: fontsSize.md1,
  },
});
