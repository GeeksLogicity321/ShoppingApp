import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/dist/Feather';
import colors from '../../constants/colors';
import endPoints from '../../constants/endPoints';
import {setLoader} from '../../redux/globalSlice';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import HomeCard from '../../components/HomeCard';
import {RFPercentage} from 'react-native-responsive-fontsize';
import apiRequest from '../../utils/apiRequest';

const Search = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setLoader(true));
    try {
      const result = await apiRequest.get(endPoints.getProducts);
      const mapData = await result.data?.products?.map(item => ({
        ...item,
        qty: 0,
      }));
      setProducts(mapData);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const searching = () => {
    let cloneArr = [...products];
    setIsSearching(true);
    // if (text.length > 0) {
    //   let filterData = cloneArr.filter(
    //     x => x.title.toLowerCase() == text.toLowerCase(),
    //   );
    //   setProducts(filterData);
    // }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          isBack
          isCart
          onRightPress={() => navigation.navigate('Cart', {from: 'Search'})}
          onLeftPress={() => navigation.goBack()}
        />
        <View style={styles.searchBar}>
          <TextInput
            value={text}
            autoCapitalize="none"
            placeholder="Search..."
            onChangeText={text => setText(text)}
            placeholderTextColor={colors.textLight}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={() => searching()}>
            <Feather
              name={'search'}
              size={RFPercentage(2.5)}
              color={colors.textLight}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productContainer}>
          <FlatList
            data={isSearching ? products : []}
            numColumns={2}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={{height: heightPercentageToDP(30)}} />
            )}
            renderItem={({item, index}) => {
              return (
                <View style={styles.box}>
                  <View style={styles.innerBox(index)}>
                    <HomeCard
                      onPress={() =>
                        navigation.navigate('ProductDetail', {data: item})
                      }
                      addToCart={() => dispatch(addToCart(item))}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      image={item?.images[0]}
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

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    width: '93%',
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 0.3,
    justifyContent: 'center',
    backgroundColor: '#b4b4b48f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(4),
    height: heightPercentageToDP(5),
    paddingHorizontal: widthPercentageToDP(4),
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
