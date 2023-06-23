import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Header from '../../components/Header';
import HomeCard from '../../components/HomeCard';
import constant from '../../constants/constant';
import {addToCart} from '../../redux/cartSlice';
import {setAllProducts, setLoader} from '../../redux/globalSlice';
import Images from '../../assets/images';
import {WCAPI} from '../../utils/apiRequest';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    dispatch(setLoader(true));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await WCAPI.get('products');
      const mapData = await response?.map(item => ({
        ...item,
        qty: 0,
      }));
      setProducts(mapData);
      dispatch(setAllProducts(mapData));

      const filterBanners = await response
        ?.map(item => item?.images[0]?.src)
        .slice(0, Math.round(response?.length / 2).toFixed(0));
      setBanners(filterBanners);

      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
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
    [products],
  );

  const onRefresh = () => {
    setIsRefresh(true);
    fetchData();
    setIsRefresh(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          title={constant.appName}
          onLeftPress={() => navigation.openDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        <View style={styles.productContainer}>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={({_, index}) => index?.toString()}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
            }
            ListFooterComponent={() => (
              <View style={{height: heightPercentageToDP(15)}} />
            )}
            ListHeaderComponent={() => (
              <View style={styles.bannerContainer}>
                {products && products[8]?.images?.length > 0 ? (
                  <Carousel
                    autoplay
                    loop={5}
                    layout="stack"
                    data={banners}
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
            )}
            renderItem={({item, index}) => {
              return (
                <View style={styles.box}>
                  <View style={styles.innerBox(index)}>
                    <HomeCard
                      onPress={() =>
                        navigation.navigate('ProductDetail', {data: item})
                      }
                      addToCart={() => {
                        if (item.attributes && item.attributes.length > 0) {
                          navigation.navigate('ProductDetail', {data: item});
                        } else {
                          dispatch(addToCart({...item, qty: 1}));
                        }
                      }}
                      title={item.name}
                      description={item.description}
                      price={item.price}
                      image={item?.images[0]?.src}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    alignSelf: 'center',
    width: '93%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: heightPercentageToDP(25),
    borderRadius: widthPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(1),

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
  productContainer: {
    width: '100%',
  },
  box: {
    width: '50%',
    alignItems: 'center',
  },
  innerBox: index => ({
    width: '90%',
    alignSelf: index % 2 == 0 ? 'flex-end' : 'flex-start',
    marginLeft: index % 2 == 0 ? 0 : widthPercentageToDP(1.5),
    marginRight: index % 2 == 0 ? widthPercentageToDP(1.5) : 0,
    marginTop: heightPercentageToDP(1.5),
  }),
});
