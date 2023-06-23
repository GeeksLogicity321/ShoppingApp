import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/dist/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

// screens
import Home from '../screens/App/Home';
import Cart from '../screens/App/Cart';
import Settings from '../screens/App/Settings';

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  const cartData = useSelector(state => state.cart);
  const TabImage =
    name =>
    ({focused}) => {
      let icon;
      switch (name) {
        case 'Home':
          icon = 'home';
          break;
        case 'Settings':
          icon = 'user';
          break;
        case 'Cart':
          icon = 'shopping-cart';
          break;

        default:
          break;
      }
      return (
        <View style={styles.iconBox}>
          <Icon
            name={icon}
            size={RFPercentage(2.5)}
            color={focused ? colors.primary : 'grey'}
          />
        </View>
      );
    };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.mainTabbar,
      }}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{tabBarIcon: TabImage('Settings')}}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: TabImage('Home')}}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: TabImage('Cart'),
          tabBarBadge: cartData.length > 0 ? cartData.length : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;

const styles = StyleSheet.create({
  mainTabbar: {
    height:
      Platform.OS === 'ios'
        ? heightPercentageToDP(10)
        : heightPercentageToDP(8),
    backgroundColor: 'white',
  },
  iconBox: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
