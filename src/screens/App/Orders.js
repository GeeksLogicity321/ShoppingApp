import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import constant from '../../constants/constant';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';

const Order = () => {
  const navigation = useNavigation();
  const ordersList = useSelector(state => state.order);
  return (
    <View style={styles.container}>
      <Header
        leftTitle="Orders"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <FlatList
          data={ordersList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderDetail', {data: item})}
                activeOpacity={0.8}
                style={styles.card}>
                <View style={styles.wrapper}>
                  {item.orderId && (
                    <Text style={styles.orderId}>Order Id {item.orderId}</Text>
                  )}
                  {item.totalPrice && (
                    <Text style={styles.totalPrice}>
                      {constant.currency}{' '}
                      {parseInt(item.totalPrice).toLocaleString('en-US')}
                    </Text>
                  )}
                  {item.time && (
                    <Text style={styles.time}>
                      {moment(item.time).format('MM-DD-YY hh:mm A')}
                    </Text>
                  )}
                  {item.cartData?.length > 1 && (
                    <Text style={styles.more}>more item</Text>
                  )}
                </View>
                <View>
                  <Ionicons
                    name={'chevron-forward'}
                    size={RFPercentage(4)}
                    color={colors.textDark}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  card: {
    width: '93%',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(1),
    borderRadius: widthPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: {
    width: '85%',
  },
  orderId: {
    fontSize: fontsSize.md1,
    fontFamily: fontsFamily.regular,
    color: colors.textDark,
    textTransform: 'uppercase',
  },
  totalPrice: {
    marginTop: heightPercentageToDP(0.5),
    fontSize: fontsSize.lg1,
    fontFamily: fontsFamily.semibold,
    color: colors.textDark,
  },
  time: {
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.semibold,
    color: colors.textLight,
  },
  more: {
    marginTop: heightPercentageToDP(1),
    fontSize: fontsSize.sm2,
    fontFamily: fontsFamily.regular,
    color: colors.textLight,
  },
});
